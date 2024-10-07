
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'API data response' });
  });

require('./app/routes/Recurso.routes')(app);
require('./app/routes/Solicitud.routes')(app)
require('./app/routes/Revisor.routes')(app)
require('./app/routes/Investigador.routes')(app)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
 
/*const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'https://restauranteapp.integrador.xyz', // Elimina la barra diagonal final
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Permitir el envío de credenciales
  optionsSuccessStatus: 204 // Estado para opciones exitosas
};


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'))
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// Importa tus rutas
require('./app/routes/auth')(app);
require('./app/routes/Pedido.routes')(app);
require('./app/routes/DetallePedido.routes')(app);
require('./app/routes/Materia_Prima.routes')(app);
require('./app/routes/Platillos.routes')(app);
require('./app/routes/Proveedores.routes')(app);
require('./app/routes/Usuario.routes')(app);
require('./app/routes/Ventas.routes')(app);

// Configura las opciones HTTPS
const options = {
  key: fs.readFileSync('/home/ubuntu/Apis-Integrador/privkey.pem'),
  cert: fs.readFileSync('/home/ubuntu/Apis-Integrador/fullchain.pem')
};

// Configura el puerto
const PORT = process.env.PORT || 8080;

https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en el puerto ${PORT}`);
});*/
