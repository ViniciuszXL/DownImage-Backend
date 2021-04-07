const environment = require ('./environment');

class Router {

    parseSuccess = (resp, values) => {
        return (document) => {
            const hasResponse = values ? values.hasResponse != undefined ? values.hasResponse : true : true;
            if (!document) {
                this.parseMessage(resp, { code: environment.CODE.INTERN, success: false, message: 'Não foi retornado nenhum valor para ser mostrado.' });
            } else {
                this.parseMessage(resp, { 
                    code: environment.CODE.SUCCESS, success: true, 
                    response: hasResponse ? values ? values.response != undefined ?  values.response : document : document : undefined,
                    message: values ? values.message : undefined,
                    isImage: values ? values.isImage : undefined
                });
            }
        };
    }

    parseError = (resp, values) => {
        return this.parseMessage(resp, { code: values.code ? values.code : environment.CODE.INTERN, success: false, message: values.message });
    }

    parseErrorThen = (resp) => {
        return (error) => {
            console.error(error);
            this.parseMessage(resp, {
                code: environment.CODE.INTERN,
                success: false, 
                message: error.message
            });
        };
    }

    parseMessage = (resp, values) => {

        const parseDocuments = (documents) => {
            const result = [];

            try {
                for (var i in documents) {
                    const document = documents[i];
                    const { username, name, email } = document;
                    result.push({ username: username, name: name, email: email });
                }
            } finally {
                return result;
            }
        }

        const parseImages = (images) => {
            const result = [];

            try {
                for (var i in images) {
                    const image = images[i];
                    const { url, height, width, thumbnail, name, title } = image;
                    result.push({ url: url, height: height, width: width, thumbnail: thumbnail, name: name, title: title });
                }
            } finally {
                return result;
            }
        }

        const { code } = values;
        values.code = undefined;
        if (values.response && !values.isImage) {
            values.response = parseDocuments(!values.response.length ? [ values.response ] : values.response);
        }

        if (values.isImage) {
            values.response = parseImages(!values.response.length ? [ values.response ] : values.response);
        }
        
        values.isImage = undefined;
        return resp.status(code).json(values);
    }

}

module.exports = Router;