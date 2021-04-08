const express = require('express');

// Criando uma rota //
const route = express.Router();

// Classes //
const SearchRouterCommon = require('./search.router.common');

class SearchRouter extends SearchRouterCommon {

    startRouter(app) {

        // Buscando imagens na pesquisa do Flickr //
        //route.get('/api/search/:tags', this.searchFlickr);
        route.get('/api/search/:tags', this.searchImgur);

        // Buscando imagens com as palavras no banco de fotos da WebSearch //
        //route.get({ path: '/api/search/:tags', version: '1.0.0' }, this.search);

        // Função que faz com que a rota seja aplicada no servidor web //
        app.use(route);
    }

}

module.exports = new SearchRouter();