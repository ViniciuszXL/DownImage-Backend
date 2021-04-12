const axios = require('axios');

// Environment //
const environment = require('../environment');

// NAO USADO //
class WebSearchAPI {

    searchImages = (values) => {
        // Página default //
        const DEFAULT_PAGE_NUMBER = environment.WEB_SEARCH.DEFAULT_PAGE_NUMBER;

        // Quantidade de imagens por página default //
        const DEFAULT_PAGE_SIZE = environment.WEB_SEARCH.DEFAULT_PAGE_SIZE;

        return new Promise(async (resolve, reject) => {

            // Fazendo a requisição //
            axios.default({
                // URL base //
                baseURL: environment.WEB_SEARCH.URI,

                // Método da requisição //
                method: 'GET',

                // Parâmetros pedidos na hora de buscar imagens no banco de dados //
                params: {
                    // Aqui é o que irá ser buscado //
                    q: values ? values.tags : 'Default',

                    // Página //
                    pageNumber: values ? values.pageNumber != undefined ? values.pageNumber : DEFAULT_PAGE_NUMBER : DEFAULT_PAGE_NUMBER,

                    // Quantidade de valores por página //
                    pageSize: values ? values.pageSize != undefined ? values.pageSize : DEFAULT_PAGE_SIZE : DEFAULT_PAGE_SIZE,

                    // Auto correção //
                    autoCorrect: environment.WEB_SEARCH.DEFAULT_AUTO_CORRECT
                },

                // Headers necessários para o funcionamento da requisição //
                headers: {
                    // KEY de uma conta na API //
                    'x-rapidapi-key': environment.WEB_SEARCH.KEY,

                    // URL da host //
                    'x-rapidapi-host': environment.WEB_SEARCH.HOST,
                    'useQueryString': true
                }
            })

            // Requisição feita com sucesso e retornado a data //
            .then(res => resolve(res.data))

            // Ocorreu um erro na requisição //
            .catch(err => reject(err))
        });
    }

}

module.exports = new WebSearchAPI();