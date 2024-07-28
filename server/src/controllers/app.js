const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');

require('dotenv').config();
const { getTokens } = require('../tokens');
const { log } = require('console');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});


db.connect((err) => {
  if (err) throw err;
  //console.log('Conexión a la BD establecida');
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

const getAccessToken = async () => {
  const tokens = await getTokens();
  return tokens.access_token;
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const createProduct = async (req, res) => {
    try {
      console.log('Intentando obtener token de acceso...');
      const ACCESS_TOKEN = await getAccessToken();
      console.log('Token de acceso obtenido:', ACCESS_TOKEN);
  
      console.log('este es la id categoria', req.body.category_id);
      console.log('Esto es lo que llega', req.file) //body
      const imageUrl = `http://localhost:3000/uploads/${req.body.file.filename}`;
      console.log('URL de la imagen:', imageUrl);
  
      const mlProduct = {
        title: req.body.title,
        description: req.body.description,
        currency_id: "MXN",
        price: req.body.price,
        available_quantity: req.body.available_quantity,
        condition: "new",
        category_id: req.body.category_id,
        listing_type_id: "gold_special",
        pictures: [{ source: imageUrl }],
        attributes: [
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
  
      console.log('Intentando crear producto en Mercado Libre...');
      const response = await axios.post('https://api.mercadolibre.com/items', mlProduct, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      const productML_id = response.data.id;
      console.log('Producto creado en Mercado Libre:', response.data);
      console.log('Producto creado correctamente con el id: ', productML_id);
  
      const dbProduct = {
        id_ML: productML_id,
        category_id: req.body.category_id,
        price: req.body.price,
        available_quantity: req.body.available_quantity,
        title: req.body.title,
        precioCompra: 1000,
        description: req.body.description
      };
  
      console.log('Intentando guardar producto en la base de datos...');
      db.query('INSERT INTO Producto SET ?', dbProduct, (err, result) => {
        if (err) {
          throw err;
        }
        console.log('Producto guardado en la base de datos:', result);
        res.status(201).json({
          message: 'Producto creado en ML y BD correctamente',
          mlData: response.data,
          dbData: dbProduct
        });
      });
    } catch (error) {
      if (error.response) {
        console.error('Error al comunicarse con Mercado Libre:', error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error('Error interno:', error.message);
        res.status(500).json({ message: 'Error al comunicarse con el servidor de Mercado Libre o la base de datos', error: error.message });
      }
    }
  };
  
const getProduct = async (req, res) => {
    try {
        const ACCESS_TOKEN = await getAccessToken();

        const mlResponse = await axios.get(`https://api.mercadolibre.com/items/${req.params.id}`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        });

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

const updateProduct = async (req, res) => {
    console.log("estoy dentro");
    console.log("el id del producto:", req.params.id);
    console.log("req.body", req.body);
    console.log('este es la id categoria', req.body.category_id);
    console.log("name imagen ", req.body.file.filename);
    console.log("imagen ", req.body.file);
    try {
        const ACCESS_TOKEN = await getAccessToken();
        const imageUrl = `http://localhost:3000/uploads/${req.body.file.filename}`;
        console.log("Entro")

        const mlProduct = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            available_quantity: req.body.available_quantity,
            category_id: req.body.category_id,
            pictures: [{ source: imageUrl }]
        };

        const mlResponse = await axios.put(`https://api.mercadolibre.com/items/${req.params.id_ML}`, mlProduct, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        });

        const dbProduct = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            available_quantity: req.body.available_quantity,
            category_id: req.body.category_id,
            image: req.body.file ? req.body.file : req.body.imageUrl
        };

        db.query('UPDATE Producto SET ? WHERE id_ML = ?', [dbProduct, req.params.id], (err, result) => {
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



const getAllProducts = [authenticateJWT, (req, res) => {
    db.query('SELECT * FROM Producto', (err, result) => {
      if (err) {
        res.status(500).send('Error al obtener los productos');
        throw err;
      }
      res.json(result);
    });
  }];

  const deleteProduct = async (req, res) => {
    try {
        const ACCESS_TOKEN = await getAccessToken();
        console.log('Token de acceso obtenido:', ACCESS_TOKEN);
        console.log('Producto a eliminar:', req.params.id);

        // Cerrar la publicación en Mercado Libre
        const closeResponse = await axios.put(
            `https://api.mercadolibre.com/items/${req.params.id}`,
            { status: "closed" },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        );

        console.log('Respuesta de cerrar la publicación:', closeResponse.data);

        // Esperar un tiempo antes de eliminar el producto para evitar el error de "item optimistic locking"
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Eliminar producto de la base de datos
        db.query('DELETE FROM Producto WHERE id_ML = ?', [req.params.id], (err, result) => {
            if (err) {
                throw err;
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Producto no encontrado en la base de datos' });
            }
            res.json({ message: 'Producto eliminado correctamente' });
        });
    } catch (error) {
        if (error.response) {
            console.error('Error en la respuesta de Mercado Libre:', error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error('Error al comunicarse con el servidor:', error.message);
            res.status(500).json({ message: 'Error al comunicarse con el servidor de Mercado Libre o la base de datos', error: error.message });
        }
    } 
};

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    getAllProducts,
    deleteProduct
}; 

// esta api es funcional con postman, pero la quite para poder usar multer y hacer la que esta arriba, pero la de arriba no sirve ni con postman.
/*const axios = require('axios');
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
*/
