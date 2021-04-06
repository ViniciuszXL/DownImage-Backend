// Router //
const Router = require('../../common/router');

// MongoDB user model //
const userModel = require('./user.model');

// Utilitaries //
const environment = require('../../common/environment');

class UserRouterCommon extends Router {

    findAll = (req, resp) => {
        userModel.find()
            .then(this.parseSuccess(resp))
            .catch(this.parseErrorThen(resp));
    }

    find = (req, resp) => {
        const { username } = req.params;

        userModel.find({ username: username })
            .then(this.parseSuccess(resp))
            .catch(this.parseErrorThen(resp));
    }

    // Função para criar um usuário //
    create = (req, resp) => {
        // Recebe esses valores pelo BODY da requisição //
        const { username, email } = req.body;

        // Buscar se já existe um nome de usuário cadastrado //
        userModel.find({ username: username })
            .then(res => {
                if (res.length) {
                    return this.parseMessage(resp, {
                        code: environment.CODE.INTERN,
                        success: false,
                        message: 'Já existe um usuário cadastrado com esse nome de usuário.'
                    })
                }

                // Buscar se já existe um email cadastrado //
                userModel.find({ email: email })
                    .then(res => {
                        if (res.length) {
                            return this.parseMessage(resp, {
                                code: environment.CODE.INTERN,
                                success: false,
                                message: 'Já existe um usuário cadastrado com esse e-mail.'
                            })
                        }

                        // Criando usuário //
                        const newUser = new userModel(req.body);
                        newUser.save()
                            .then(this.parseSuccess(resp))
                            .catch(this.parseErrorThen(resp));
                    })
                    .catch(this.parseErrorThen(resp));
            })
            .catch(this.parseErrorThen(resp));
    };

    // Função para deletar um usuário //
    delete = (req, resp) => {
        const { username } = req.params;

        userModel.find({ username: username })
            .then(res => {
                if (!res.length) {
                    return this.parseMessage(resp, {
                        code: environment.CODE.NOT_FOUND,
                        success: false,
                        message: 'Usuário não encontrado no banco de dados!'
                    })
                }

                userModel.deleteOne({ username: username })
                    .then(res => {

                    })
                    .catch(this.parseErrorThen(resp));
            })
            .catch(this.parseErrorThen(resp));
    }

}

module.exports = UserRouterCommon;