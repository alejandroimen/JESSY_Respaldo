const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersJWTRoutes = require('./routes/users_jwt');
const ventasRoutes = require('./routes/ventas');
const proveedoresRoutes = require('./routes/proveedores');
const categoriasRoutes= require('./routes/Categorias');
const comprasRoutes = require('./routes/Compras');
const listadeDeseosRoutes = require('./routes/ListaDeDeseos');
//const productosRoutes = require('./routes/productos');
const productosMLRoutes = require('./routes/productoML');
const comentariosRoutes = require('./routes/Comentarios')
const { refreshAccessToken } = require('./tokens');
require('dotenv').config();

const app = express();
const port = process.env.DB_PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Permite solicitudes desde esta URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite estos métodos
  credentials: true // Si necesitas enviar cookies o autenticación HTTP
})); 

//app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' })); // Ajusta el límite según tus necesidades
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/usersJWT', usersJWTRoutes);
app.use('/ventas', ventasRoutes);
app.use('/proveedores', proveedoresRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/compras', comprasRoutes);
app.use('/listadeseos', listadeDeseosRoutes);
//app.use('/productos', productosRoutes);
app.use('/comentarios', comentariosRoutes);
app.use('/products',productosMLRoutes);

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});

