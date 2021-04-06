const axios = require('axios');

// Environment //
const environment = require('../environment');

class WebSearchAPI {

    searchImages = (values) => {
        const DEFAULT_PAGE_NUMBER = environment.WEB_SEARCH.DEFAULT_PAGE_NUMBER;
        const DEFAULT_PAGE_SIZE = environment.WEB_SEARCH.DEFAULT_PAGE_SIZE;

        return new Promise(async (resolve, reject) => {
            axios.default({
                baseURL: environment.WEB_SEARCH.URI,
                params: {
                    q: values ? values.tags : 'Default',
                    pageNumber: values ? values.pageNumber != undefined ? values.pageNumber : DEFAULT_PAGE_NUMBER : DEFAULT_PAGE_NUMBER,
                    pageSize: values ? values.pageSize != undefined ? values.pageSize : DEFAULT_PAGE_SIZE : DEFAULT_PAGE_SIZE,
                    autoCorrect: environment.WEB_SEARCH.DEFAULT_AUTO_CORRECT
                },
                headers: {
                    'x-rapidapi-key': environment.WEB_SEARCH.KEY,
                    'x-rapidapi-host': environment.WEB_SEARCH.HOST,
                    'useQueryString': true
                }
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        });
    }

}

module.exports = new WebSearchAPI();