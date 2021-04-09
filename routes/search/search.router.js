const express = require('express');

// Criando uma rota //
const route = express.Router();

// Classes //
const SearchRouterCommon = require('./search.router.common');

class SearchRouter extends SearchRouterCommon {

    startRouter(app) {

        // Buscando imagens na pesquisa do Imgur //
        route.get('/api/search/:tags', this.searchImgur);

        // Função que faz com que a rota seja aplicada no servidor web //
        app.use(route);
    }

}

module.exports = new SearchRouter();