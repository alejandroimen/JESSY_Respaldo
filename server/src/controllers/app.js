const axios = require('axios');
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
};
