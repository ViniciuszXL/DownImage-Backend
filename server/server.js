const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

const environment = require('../common/environment');

// Creating the app server //
const app = express();

// Using the cors //
app.use(require('cors')());

// Using json //
app.use(express.json());

// Routes //
const routes = [ 
    require('../routes/user/user.router') 
]

// Iniciando a conexao com o MongoDB //
let startMongo = new Promise(async (resolve, reject) => {
    try {
        await mongoose.connect(`${ environment.MONGO.URI }${ environment.MONGO.HOST }/${ environment.MONGO.DATABASE }`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        resolve(true);
    } catch (err) {
        reject(err);
    }
});

// Iniciando o servidor HTTP //
let startServer = new Promise((resolve, reject) => {
    try {
        
        // Creating the server HTTP //
        const server = http.createServer(app);
        
        // Listening... //
        server.listen(environment.SERVER.PORT);

        // Starting the routes //
        for (var i in routes) {
            const route = routes[i];
            route.startRouter(app);
        }

        // Started //
        server.on('listening', () => {
            resolve(true);
            console.log(`Server is started and listening the port ${ environment.SERVER.PORT }.`);
        });
    } catch (err) {
        reject(err);
    }
});

// Initial //
let start = new Promise((resolve, reject) => {
    try {
        startMongo.then(() => {
            // Conexao com o Banco de dados funcionou //

            startServer.then(() => {

                // Servidor HTTP iniciado com sucesso, retornando um valor true para a funcao.
                resolve(true);
            }).catch(err => reject(err));
        }).catch(err => reject(err));
    } catch (err) {
        reject(err);
    }
});

module.exports = { start };
