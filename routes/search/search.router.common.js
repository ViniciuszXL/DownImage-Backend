const axios = require('axios');

// Router //
const Router = require('../../common/router');

// API //
const WebSearchAPI = require('../../common/api/websearch.api');
const ImgurAPI = require('../../common/api/imgur.api');
const environment = require('../../common/environment');

class SearchRouterCommon extends Router {

    searchImgur = (req, resp) => {
        const { tags } = req.params;

        ImgurAPI.search(tags)

        .then(this.parseSuccess(resp))
        
        .catch(this.parseErrorThen(resp));
    }

    // Função de buscar imagens no Flickr //
    searchFlickr = (req, resp) => {
        const { tags } = req.params;

        axios.default({
            method: 'GET',
            url: `${ environment.FLICKR.URI + tags }`,
            responseType: 'html'
        })

        .then(res => { return res.data })

        .then(res => {
            console.log(res);
        })

        .catch(this.parseErrorThen(resp));

    }

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