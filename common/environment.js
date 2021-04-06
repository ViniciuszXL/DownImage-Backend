module.exports = {
    SERVER: {
        PORT: process.env.SERVER_PORT || 3030
    },

    CODE: {
        SUCCESS: 200,

        INTERN: 500,
        REDIRECT: 300,

        REQUEST: 400,
        NOT_ALLOWED: 401,
        PROHIBITED: 403,
        NOT_FOUND: 404
    },

    MONGO: {
        URI: process.env.MONGO_URI || 'mongodb://',
        HOST: process.env.MONGO_HOST || 'localhost',
        DATABASE: process.env.MONGO_DATABASE || 'idownload'
    },

    WEB_SEARCH: {
        URI: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
        KEY: '10386e043emsh120ecdda4db4d89p11dd7cjsn81a90f9016a0',
        HOST: 'contextualwebsearch-websearch-v1.p.rapidapi.com',

        DEFAULT_PAGE_NUMBER: 1,
        DEFAULT_PAGE_SIZE: 10,
        DEFAULT_AUTO_CORRECT: true
    }
}