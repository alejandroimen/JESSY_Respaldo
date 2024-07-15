const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { refreshAccessToken } = require('../tokens');
require('dotenv').config();

// Configuración de la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) throw err;
  console.log('UsersJWT-Conexión a la BD establecida');
});

exports.login = async (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM Usuarios WHERE email = ?', [email], async (err, result) => {
    if (err) {
      res.status(500).send('Error en el servidor');
      return; // Se detiene la ejecución después de enviar la respuesta
    }
    if (result.length === 0) {
      res.status(401).send('Credenciales inválidas');
      return; // Se detiene la ejecución después de enviar la respuesta
    }
    const user = result[0];
    // Verificar contraseña (con bcrypt)
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).send('Credenciales inválidas');
      return; // Se detiene la ejecución después de enviar la respuesta
    }
    // Generar JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
    // Refresca el token cada 5 horas y 50 minutos (350 minutos)
    setInterval(refreshAccessToken, 350 * 60 * 1000);
    // Llama a la función al iniciar la aplicación
    refreshAccessToken();
  });
};

// Middleware de autenticación
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.sendStatus(403); // Prohibido (token inválido)
        return; // Se detiene la ejecución después de enviar la respuesta
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // No autorizado (sin token)
    return; // Se detiene la ejecución después de enviar la respuesta
  }
};

// Rutas protegidas con autenticación JWT
exports.getAllUsers = [authenticateJWT, (req, res) => {
  db.query('SELECT * FROM Usuarios', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los usuarios');
      return; // Se detiene la ejecución después de enviar la respuesta
    }
    res.json(result);
  });
}];

exports.addUser = (req, res) => {
  const newUser = req.body;
  if (!newUser.email || !newUser.password) {
    res.status(400).send('Email y contraseña son requeridos');
    return; // Se detiene la ejecución después de enviar la respuesta
  }

  // Hashear la contraseña antes de guardarla (bcrypt)
  bcrypt.hash(newUser.password, 10, (err, hash) => {
    if (err) {
      res.status(500).send('Error al hashear la contraseña');
      return; // Se detiene la ejecución después de enviar la respuesta
    }
    newUser.password = hash;

    db.query('INSERT INTO Usuarios SET ?', newUser, (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar el usuario');
        return; // Se detiene la ejecución después de enviar la respuesta
      }
      res.status(201).send('Usuario agregado correctamente');
    });
  });
};


/*
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
// Configuración de la base de datos (igual que antes)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});
db.connect((err) => {
  if (err) throw err;
  console.log('UsersJWT-Conexión a la BD establecida');
});

exports.login = async (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM Usuarios WHERE email = ?', [email], async (err, result) => {
    if (err) {
      res.status(500).send('Error en el servidor');
      throw err;
    }
    if (result.length === 0) {
      return res.status(401).send(' inválidas');
    }
    const user = result[0];
    // Verificar contraseña (con bcrypt)
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send('Credenciales inválidas');
    }
    // Generar JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};
// Middleware de autenticación
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
// Rutas protegidas con autenticación JWT
exports.getAllUsers = [authenticateJWT, (req, res) => {
  db.query('SELECT * FROM Usuarios', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los usuarios');
      throw err;
    }
    res.json(result);
  });
}];
exports.addUser = (req, res) => {
  const newUser = req.body;
  // Hashear la contraseña antes de guardarla (bcrypt)
  bcrypt.hash(newUser.password, 10, (err, hash) => { // 10 es el número de rondas de hashing
    if (err) {
      res.status(500).send('Error al hashear la contraseña');
      throw err;
    }
    newUser.password = hash;

    db.query('INSERT INTO Usuarios SET ?', newUser, (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar el usuario');
        throw err;
      }
      res.status(201).send('Usuario agregado correctamente');
    });
  });
}; */