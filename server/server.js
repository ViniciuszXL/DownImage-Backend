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
    require('../routes/user/user.router'),
    require('../routes/search/search.router')
]

// Iniciando a conexao com o MongoDB //
const startMongo = () => {
    return new Promise((resolve, reject) => {
        
        // Iniciando a conexão com o MongoDB
        mongoose.connect(`${ environment.MONGO.URI }${ environment.MONGO.HOST }:${ environment.MONGO.PORT }/${ environment.MONGO.DATABASE }`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        // Conexão com o MongoDB foi feita com sucesso //
        .then(res => resolve(res))

        // Ocorreu um erro na conexão com o MongoDB //
        .catch(err => reject(err));
    });
}

const startServer = () => {
    return new Promise((resolve, reject) => {
        // Criando o servidor HTTP //
        const server = http.createServer(app);
        
        // Atribuindo a porta ao servidor //
        server.listen(environment.SERVER.PORT);

        // Iniciando as rotas //
        for (var i in routes) {
            const route = routes[i];
            route.startRouter(app);
        }

        // Servidor iniciado com sucesso //
        server.on('listening', () => {
            resolve(true);
            console.log(`Servidor está iniciado e escutando a porta ${ environment.SERVER.PORT }.`);
        });
        
        // Ocorreu um erro ao iniciar o servidor //
        server.on('error', err => reject(err));
    });
}

const start = () => {
    return new Promise((resolve, reject) => {
        return startMongo()

        // Sucesso ao conectar ao banco de dados //
        .then(() => {

            // Iniciando o servidor //
            startServer()

            // Sucesso ao iniciar o servidor HTTP //
            .then(() => resolve(true))

            // Ocorreu um erro ao iniciar o servidor HTTP //
            .catch(err => reject(err));
        })

        // Ocorreu um erro ao iniciar a conexão ao banco de dados //
        .catch(err => reject(err))
    })
}

module.exports = { start };
