import express from 'express';
import routerProducts from './routers/products.js';
import config from './config.js';


// tanto el JSON como el .dat se utilizan de forma local 

const app = express();
const PORT = config.PORT;

app.use(express.static('public', { extensions: ['html', 'htm'] }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/products', routerProducts);

const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}.`));
server.on('error', error => console.log('No se pudo iniciar Express: ', error));
