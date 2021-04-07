// Router //
const Router = require('../../common/router');

// MongoDB user model //
const userModel = require('./user.model');

// Utilitaries //
const environment = require('../../common/environment');
const crypto = require('../../common/crypto/crypto');

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
                return this.parseError(resp, { message: 'Já existe um usuário cadastrado com esse nome de usuário.' });
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
        
        // Sucesso ao buscar o usuário no banco de dados //
        .then(res => {

            // Usuário não existe //
            if (!res.length) {
                return this.parseError(resp, { code: environment.CODE.NOT_FOUND, message: 'Usuário não encontrado no banco de dados!' });
            }

            // Deletando o usuário do banco de dados //
            userModel.deleteOne({ username: username })

            // Usuário deletado com sucesso //
            .then(this.parseSuccess(resp, { message: 'Usuário deletado com sucesso!', hasResponse: false }))

            // Ocorreu um erro ao deletar o usuário do banco de dados //
            .catch(this.parseErrorThen(resp));
        })

        // Ocorreu um erro ao buscar o usuário no banco de dados //
        .catch(this.parseErrorThen(resp));
    }

    // Função para atualizar o usuário //
    update = (req, resp) => {
        // Pegando o nome de usuário na URL //
        const { username } = req.params;

        // Opções para o Mongoose //
        const options = {
            overtwrite: true
        }

        // Função para atualizar as informações do usuário //
        userModel.updateOne({ username: username }, req.body, options).exec()
        
        // Função retornou algum valor //
        .then(res => {

            // Modificado com sucesso //
            if (res.n) {
                return userModel.find({ username: username });
            }

            // Não foi encontrado o usuário //
            return this.parseError(resp, { code: environment.CODE.NOT_FOUND, message: 'Usuário não encontrado no banco de dados!' });
        })

        // Informando os novos valores do usuário //
        .then(this.parseSuccess(resp, { message: 'Foi modificado com sucesso as informações do usuário!', hasResponse: true }))

        // Ocorreu um erro no início da função //
        .catch(this.parseErrorThen(resp));
    };

    // Função para logar o usuário //
    login = (req, resp) => {
        // Pegando o nome do usuário na URL //
        const { username } = req.params;

        // Pegando a senha do usuário no BODY //
        const { password } = req.body;

        // Função para verificar se existe um usuário ou não //
        userModel.find({ username: username })

        // Função foi executada com sucesso. //
        .then(res => {
            // Usuário não existe //
            if (!res.length) {
                return this.parseError(resp, { code: environment.CODE.NOT_FOUND, message: 'Usuário não encontrado no banco de dados!' });
            }

            // Pegando os dados do usuário //
            const data = res[0];

            // Senha do usuário cadastrado e está salvo no banco de dados //
            const userPassword = data.password.split(';');

            // Decriptando a senha encriptada para comparação de valores //
            const passwordDecrypted = crypto.decrypt(userPassword[0], userPassword[1]);

            // A senha informada não é igual a cadastrada! //
            if (password !== passwordDecrypted) {
                return this.parseError(resp, { code: environment.CODE.NOT_ALLOWED, message: 'Senha informada está incorreta!' });
            }

            // Senha informada está correta! //
            return true;
        })

        // Retornado dizendo que a senha está correta e que o usuário foi logado com sucesso //
        .then(this.parseSuccess(resp, { message: 'Logado com sucesso!', hasResponse: false }))

        // Ocorreu um erro na função //
        .catch(this.parseErrorThen(resp));
    }

}

module.exports = UserRouterCommon;