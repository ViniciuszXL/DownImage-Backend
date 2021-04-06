// Router //
const Router = require('../../common/router');

// MongoDB user model //
const userModel = require('./user.model');

// Utilitaries //
const environment = require('../../common/environment');

class UserRouterCommon extends Router {

    // Função para buscar todos os usuários cadastrados //
    findAll = (req, resp) => {
        // Buscando todos os documentos disponíveis //
        userModel.find()

        // Ocorreu êxito em buscar todos os usuários cadastrados no MongoDB //
        .then(this.parseSuccess(resp))

        // Ocorreu um erro ao buscar os usuários cadastrados //
        .catch(this.parseErrorThen(resp));
    }

    // Função para buscar um único usuário //
    find = (req, resp) => {
        // Pega o nome de usuário pela URL (QUERY) da requisição //
        const { username } = req.params;

        // Buscando um usuário por nome de usuário //
        userModel.find({ username: username })

        // Ocorreu êxito em buscar o usuário //
        .then(this.parseSuccess(resp))

        // Ocorreu um erro ao buscar o usuário //
        .catch(this.parseErrorThen(resp));
    }

    // Função para criar um usuário //
    create = (req, resp) => {
        // Recebe esses valores pelo BODY da requisição //
        const { username, email } = req.body;

        // Buscar se já existe um nome de usuário cadastrado //
        userModel.find({ username: username })

        // Ocorreu êxito em buscar o valor no banco de dados //
        .then(res => {
            // Já existe um usuário cadastrado com esse nome de usuário //
            if (res.length) {
                return this.parseError(reps, { message: 'Já existe um usuário cadastrado com esse nome de usuário.' });
            }

            // Buscar se já existe um email cadastrado //
            userModel.find({ email: email })

             // Ocorreu êxito em buscar o valor no banco de dados //
            .then(res => {
                // Já existe um usuário cadastrado com esse e-mail //
                if (res.length) {
                    return this.parseError(resp, { message: 'Já existe um usuário cadastrado com esse e-mail.' });
                }

                // Criando usuário //
                const newUser = new userModel(req.body);

                // Salvando no MongoDB //
                newUser.save()

                // Salvo com sucesso //
                .then(this.parseSuccess(resp, { message: 'Usuário cadastrado com sucesso!' }))

                // Ocorreu um erro //
                .catch(this.parseErrorThen(resp));
            })

             // Ocorreu um erro na requisição //
            .catch(this.parseErrorThen(resp));
        })

        // Ocorreu um erro na requisição //
        .catch(this.parseErrorThen(resp));
    };

    // Função para deletar um usuário //
    delete = (req, resp) => {
        const { username } = req.params;

        // Verificando se existe o usuário //
        userModel.find({ username: username })
            .then(res => {
                if (!res.length) {
                    return this.parseError(resp, { code: environment.CODE.NOT_FOUND, message: 'Usuário não encontrado no banco de dados!' });
                }

                // Deletando o usuário do banco de dados //
                userModel.deleteOne({ username: username })
                    .then(this.parseSuccess(resp, { message: 'Usuário deletado com sucesso!', hasResponse: false }))
                    .catch(this.parseErrorThen(resp));
            })
            .catch(this.parseErrorThen(resp));
    }

}

module.exports = UserRouterCommon;