const express = require('express');

// Criando uma rota //
const route = express.Router();

// Classes //
const UserRouterCommon = require('./user.router.common');

class UserRouter extends UserRouterCommon {

    startRouter(app) {

        // Buscar todos os usuários cadastrados //
        route.get('/api/users', this.findAll);

        // Buscar um usuário por username //
        route.get('/api/users/:username', this.find);

        // Criando um novo usuário //
        route.post('/api/users', this.create);

        // Deletando um usuário //
        route.delete('/api/users/:username', this.delete);

        // Função que faz com que a rota seja aplicada no servidor web //
        app.use(route);
    }

}

module.exports = new UserRouter();