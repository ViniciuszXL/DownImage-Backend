const environment = require ('./environment');

class Router {

    parseSuccess = (resp, values) => {
        return (document) => {
            this.parseMessage(resp, {
                code: values.code ? values.code : !document.length ? environment.CODE.NOT_FOUND : environment.CODE.SUCCESS,
                success: values.success ? values.success : !document.length ? false : true, 
                message: values.message ? values.message : !document.length ? 'O valor do parâmetro informado não foi encontrado no nosso banco de dados!' : undefined,
                response: values.response ? values.response : document.length ? document : undefined
            })
        };
    }

    parseError = (resp, err) => {
        console.error(err);
        this.parseMessage(resp, {
            code: environment.CODE.INTERN,
            success: false, 
            message: err.message
        });
    }

    parseErrorThen = (resp) => {
        return (error) => {
            console.error(error);

            this.parseMessage(resp, {
                code: environment.CODE.INTERN,
                success: false, 
                message: error.message
            })
        };
    }

    parseMessage = (resp, values) => {
        const { code } = values;
        values.code = undefined;
        return resp.status(code).json(values);
    }

}

module.exports = Router;