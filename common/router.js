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

        const parseImages = (response) => {
            const result = [];

            try {
                for (var i in response) {
                    const data = JSON.parse(response[i]);
                    const { id, title, description, view_count, upvote_count, downvote_count, score, created_at, privacy, media } = data;
                    const images = [];
    
                    for (var i in media) {
                        const mediaData = media[i];
                        const { id, type, name, basename, url, width, height, size, created_at, metadata } = mediaData;
                        const { title } = metadata;
                        
                        images.push({ id: id, type: type, name: name, basename: basename, url: url, width: width, height: height, size: size, created_at: created_at, title: title })
                    }

                    result.push({ id: id, title: title, description: description, view: view_count, upvote: upvote_count, downvote: downvote_count, score: score, created_at: created_at, privacy: privacy, images: images })
                }
            } catch (err) {
                console.error(err);
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