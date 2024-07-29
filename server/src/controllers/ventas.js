const mysql = require('mysql2');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { getTokens } = require('../tokens')
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) throw err;
  //console.log('Venta-Conexión a la BD establecida');
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Prohibido (token inválido)
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // No autorizado (sin token)
  }
};
const getAccessToken = async()=> {
   const tokens = await getTokens();
   return tokens.access_token;
}

exports.getAllVentas = [authenticateJWT, (req, res) => {
  db.query('SELECT * FROM Venta', (err, result) => {
    if (err) { 
      console.error('Error al obtener las ventas', err);
      return res.status(500).send('Error al obtener las ventas');
    }
    res.json(result);
  });
}];

const addVenta = async (newVenta, productos) => {
  try {
    // Primera consulta (INSERT o REPLACE en la tabla Venta)
    const [result] = await db.promise().query('REPLACE INTO Venta SET ?', [newVenta]);

    for (const prod of productos){
      const [rows] = await db.promise().query('SELECT * FROM Vendido WHERE idVenta = ?', [result.idVenta]);

      if (rows.length === 0) {
        let vendido = {
          idProductoML: prod.item.id, 
          idVenta: [result.idVenta],
          cantidad: prod.quantity
        }
        await db.promise().query('INSERT INTO Vendido SET ?', vendido);
      } 
    }

    return result;
  } catch (error) {
    console.error('Error al agregar la venta:', error);
    throw error;
  }
};

exports.getVentasFromML = async(req, res) => {
  const seller = '1922378338'  
  const from = '2024-06-01T00:00:00.000-00:00'
  const to = req.body.to
  const token = await getAccessToken();
  const url = `https://api.mercadolibre.com/orders/search?seller=${seller}&order.date_created.from=${from}&order.date_created.to=${to}`;
  
  console.log('TOKEN ', token); 
  let result = []
  try {
    console.log('Hola');
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      } 
    });  
    console.log('Hola');
    result = response.data.results
    let success = response.status === 200 ? true:false
    console.log('Este es el resultado', result);

    for(const venta of result) {
      let newVenta = {
        idVenta: venta.id,
        fechaVenta: venta.date_created,
        total: venta.total_amount
      }
      let productos = venta.order_items

      try {
        await addVenta(newVenta, productos);
        console.log('Venta agregada:', venta.id);
      } catch (error) {
        console.error('Error al agregar la venta:', error, venta);
      }
    }

    return res.status(200).json({success: success, data: result})
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado diferente a 2xx
      console.error('Error:', error.response.status);
      console.error('Mensaje:', error.response.data);
    } else if (error.request) {
      // La solicitud fue hecha pero no hubo respuesta
      console.error('Error en la solicitud:', error.request);
    } else {
      // Algo pasó al configurar la solicitud
      console.error('Error en la configuración de la solicitud:', error.message);
    }
  }
}

exports.getVentaByID = [authenticateJWT, (req, res) =>{
  const idVenta = req.params.id;
  db.query('SELECT * FROM Producto WHERE id_producto = ?', [idVenta], (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener/encontrar el producto');
      throw err;
    }
    res.json({
      message: 'Venta encontrada:',
      data: result
    });
  });
}];