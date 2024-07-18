const axios = require('axios');
const mysql = require('mysql2');
require('dotenv').config();
const { getTokens } = require('../tokens');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conexión a la BD establecida');
});

const getAccessToken = async () => {
    const tokens = await getTokens();
    return tokens.access_token;
};

exports.createProduct = async (req, res) => {
    try {
        const ACCESS_TOKEN = await getAccessToken();
        
        const mlProduct = {
            title: req.body.title,
            description: req.body.description,
            currency_id: "MXN", //default
            price: req.body.price,
            available_quantity: req.body.available_quantity,
            condition: "new", //default
            category_id: req.body.category_id,
            listing_type_id: "gold_special", //envio gratis, por default
            pictures: req.body.pictures,
            attributes: [ //Por default ya que no aparece en la vista
                {
                  "id": "BRAND",
                  "value_id": "34567",
                  "value_name": "HP"
                },
                {
                  "id": "COLOR",
                  "value_name": "Rojo"
                },
                {
                  "id": "MODEL",
                  "value_name": "XYZ-123"
                }
              ]
        };

        // Crear el producto en Mercado Libre
        const response = await axios.post('https://api.mercadolibre.com/items', mlProduct, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        // Preparar el producto para la base de datos
        const dbProduct = {
            category_id: req.body.category_id,
            price: req.body.price,
            available_quantity: req.body.available_quantity,
            title: req.body.title,
            precioCompra: 1000, //por dafult 
            description: req.body.description
        };

        // Crear el producto en la base de datos
        db.query('INSERT INTO Producto SET ?', dbProduct, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(201).json({
                message: 'Producto creado en ML y BD correctamente',
                mlData: response.data,
                dbData: dbProduct
            });
        });
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Error al comunicarse con el servidor de Mercado Libre o la base de datos', error: error.message });
        }
    }
};

exports.getProduct = async (req, res) => {
    try {
        const ACCESS_TOKEN = await getAccessToken();
        
        // Obtener producto de Mercado Libre
        const mlResponse = await axios.get(`https://api.mercadolibre.com/items/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        });

        // Obtener producto de la base de datos
        db.query('SELECT * FROM Producto WHERE id_producto = ?', [req.params.id], (err, dbResult) => {
            if (err) {
                throw err;
            }
            if (dbResult.length === 0) {
                return res.status(404).json({ message: 'Producto no encontrado en la base de datos' });
            }
            res.json({
                mlData: mlResponse.data,
                dbData: dbResult[0]
            });
        });
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Error al comunicarse con el servidor de Mercado Libre o la base de datos', error: error.message });
        }
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const ACCESS_TOKEN = await getAccessToken();
        
        const mlProduct = {
            title: req.body.title,
            description: req.body.description,
            currency_id: "MXN",
            price: req.body.price,
            available_quantity: req.body.available_quantity,
            condition: "new",
            category_id: req.body.category_id,
            listing_type_id: "gold_special",
            pictures: req.body.pictures,
            attributes: req.body.attributes
        };

        // Actualizar el producto en Mercado Libre
        const mlResponse = await axios.put(`https://api.mercadolibre.com/items/${req.params.id}`, mlProduct, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        // Preparar el producto para la base de datos
        const dbProduct = {
            category_id: req.body.category_id,
            price: req.body.price,
            available_quantity: req.body.available_quantity,
            title: req.body.title,
            precioCompra: req.body.precioCompra,
            description: req.body.description
        };

        // Actualizar el producto en la base de datos
        db.query('UPDATE Producto SET ? WHERE id_producto = ?', [dbProduct, req.params.id], (err, result) => {
            if (err) {
                throw err;
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Producto no encontrado en la base de datos' });
            }
            res.json({
                message: 'Producto actualizado en ML y BD correctamente',
                mlData: mlResponse.data,
                dbData: dbProduct
            });
        });
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Error al comunicarse con el servidor de Mercado Libre o la base de datos', error: error.message });
        }
    }
};


/*const axios = require('axios');
require('dotenv').config();
const { getTokens } = require('../tokens');

const getAccessToken = async () => {
    const tokens = await getTokens();
    return tokens.access_token;
};

exports.createProduct = async (req, res) => {
    try {
        const ACCESS_TOKEN = await getAccessToken();
        const response = await axios.post('https://api.mercadolibre.com/items', req.body, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Error al comunicarse con el servidor de Mercado Libre', error: error.message });
        }
    }
};

exports.getProduct = async (req, res) => {
    try {
        const ACCESS_TOKEN = await getAccessToken();
        const response = await axios.get(`https://api.mercadolibre.com/items/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        });
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Error al comunicarse con el servidor de Mercado Libre', error: error.message });
        }
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const ACCESS_TOKEN = await getAccessToken();
        const response = await axios.put(`https://api.mercadolibre.com/items/${req.params.id}`, req.body, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Error al comunicarse con el servidor de Mercado Libre', error: error.message });
        }
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const ACCESS_TOKEN = await getAccessToken();
        const response = await axios.delete(`https://api.mercadolibre.com/items/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        });
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Error al comunicarse con el servidor de Mercado Libre', error: error.message });
        }
    }
}; */
