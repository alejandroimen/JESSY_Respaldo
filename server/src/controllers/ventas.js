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



exports.getVentasFromML = async(req, res) => {
  const seller = '1494235301'
  const from = '2024-06-01T00:00:00.000-00:00'
  const to = req.body.to
  const url = `https://api.mercadolibre.com/orders/search?seller=${seller}&order.date_created.from=${from}&order.date_created.to=${to}`;
  const token = await getAccessToken();
  console.log('TOKEN ', token);
    let result = []
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }); 
    result = response
    result = [
      {"seller": {
        "nickname": "VENDASDKMB",
        "id": 239432672
      }}]
      console.log(result);
    return res.status(200).json({success:true, data: result})
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

exports.getAllVentas = [authenticateJWT, (req, res) => {
  db.query('SELECT * FROM Venta', (err, result) => {
    if (err) {
      console.error('Error al obtener las ventas', err);
      return res.status(500).send('Error al obtener las ventas');
    }
    res.json(result);
  });
}];

exports.addVenta = [authenticateJWT, (req, res) => {
  const newVenta = req.body;
  db.query('INSERT INTO Venta SET ?', newVenta, (err, result) => {
    if (err) {
      console.error('Error al agregar la venta', err);
      return res.status(500).send('Error al agregar la venta');
    }
    res.status(201).send('Venta agregada correctamente');
  });
}];




