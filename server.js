const express = require('express');
const moment = require('moment')

const {Server:SocketServer} = require('socket.io')
const {Server:HTTPServer} = require('http');

const app = express();
const handlebars = require('express-handlebars');
const router = require('./routes/account');
const events = require('./public/js/sockets_events');
const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);
const hbs = handlebars.create({
    extname:'.hbs',
    defaultLayout:'index.hbs',
    layoutsDir: __dirname + '/public/views/layout',
}) 


const knex = require('knex');
const knexConfig = require('./knexfile')
const dataBase = knex(knexConfig)
const tableNameProd = 'productos'
const tableNameChat = 'chat'
//const router = Router();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static( 'public'));
app.use('/api/productos',router);
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './public/views');


socketServer.on('connection', async(socket)=>{
    console.log('Nuevo cliente conectado');
    socket.emit(events.MOSTRAR_PRODUCTOS,await dataBase(tableNameProd))
    socket.on(events.ENVIAR_PRODUCTO,async (info)=>{
        await dataBase(tableNameProd).insert(info)
        console.log(info);
        socketServer.sockets.emit(events.MOSTRAR_PRODUCTOS,await dataBase(tableNameProd))
    }) 
}) 
socketServer.on('connection', async(socket)=>{
    socketServer.emit(events.TOTAL_MENSAJES, await dataBase(tableNameChat))
    socket.on(events.ENVIAR_MENSAJE, async(info)=>{
        console.log(info);
        await dataBase(tableNameChat).insert(info)
        socketServer.sockets.emit(events.TOTAL_MENSAJES, await dataBase(tableNameChat))
    })
}) 


const PORT = process.env.PORT || 4000
httpServer.listen(PORT, ()=>{
    console.log(`El servidor se esta ejecutando en el puerto ${PORT}`);
})