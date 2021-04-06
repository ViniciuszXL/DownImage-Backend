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
    }
}