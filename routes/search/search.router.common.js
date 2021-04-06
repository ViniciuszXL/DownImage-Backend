const axios = require('axios');
const cheerio = require('cheerio');

// Router //
const Router = require('../../common/router');

// API //
const WebSearchAPI = require('../../common/api/websearch.api');

class SearchRouterCommon extends Router {

    // Função de buscar imagens //
    search = (req, resp) => {
        const { tags } = req.params;
        const { pageSize, pageNumber } = req.query;
        
        // Buscando as imagens em uma API pública //
        WebSearchAPI.searchImages({ 
            tags: tags,
            pageNumber: pageNumber,
            pageSize: pageSize
        })

        // API retornou valores com sucesso //
        .then(res => { return res.value })

        // Valores agora irão ser tratados e, por fim, mostrar na url //
        .then(this.parseSuccess(resp, { isImage: true }))

        // Ocorreu um erro na requisição //
        .catch(this.parseErrorThen(resp));
    }

}

module.exports = SearchRouterCommon;