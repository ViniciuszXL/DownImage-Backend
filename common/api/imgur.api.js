const axios = require('axios');
const cheerio = require('cheerio');

// Environment //
const environment = require('../environment');

// Model //
const imgurModel = require('./imgur.api.model');

class ImgurAPI {

    // Função de pegar as imagens dentro de uma galeria //
    searchImages = (url) => {
        return new Promise(async (resolve, reject) => {

            // Conexão com o Axios //
            axios.default({
                // Método de requisição //
                method: 'GET',

                // URL de pesquisa (https://imgur.com/gallery/:id) //
                url: `${ environment.IMGUR.BASE + url }`,

                // Tipo de content //
                headers: {
                    'Content-type': 'application/json',
                }
            })

            // Conexão feita com sucesso //
            .then(res => resolve(res.data))

            // Ocorreu um erro na conexão //
            .catch(err => reject(err));
        });
    }

    // Função de busca do imgur //
    search = (values) => {

        // Função que retira caracteres não importantes e formata a linha //
        const parseLine = (line) => {
            line = line.substr(33, line.length);
            line = line.replace(' data-page="0">', '');
            line = line.substr(0, line.length - 1);
            return line;
        }

        // Função que faz um parse das urls, verificando se atender aos requisitos e, assim, adicionando-a à uma Array //
        const parseUrls = (lines) => {
            const urls = [];

            try {
                lines.forEach(line => {
                    line = line.toString().trim();
                    if (!line.includes('href="/gallery/')) {
                        return;
                    }

                    line = parseLine(line);
                    urls.push(line);
                })
            } finally {
                return urls;
            }
        }
        
        // Função que verifica se há um ID semelhante registrado no banco de dados. Assim, retornandn o valor em menos tempo e buscando as imagens mais rapidamente //
        const findCache = async (id) => {
            const cache = await imgurModel.find({ id: id });
            if (cache.length < 1) {
                return undefined;
            }

            const cacheData = cache[0];
            const { response } = cacheData;
            return { response: response };
        }

        // Função que faz um parse para o JSON, além de pesquisar todas as imagens de uma galeria do Imgur. //
        const parseJSON = async (url) => {
            var result = undefined;

            try {
                const _searchImages = await this.searchImages(url);
                const $ = cheerio.load(_searchImages);

                $('script').each(function (i, element) {
                    if (i !== 0) return;

                    const children = element.children[0];
                    const { data } = children;
                    const _JSONreplace = data.replace('window.postDataJSON=', "");
                    const toJSON = JSON.parse(_JSONreplace);
                    result = toJSON;
                });
            } finally {
                return result;
            }
        }

        return new Promise(async (resolve, reject) => {
            const result = [];

            try {
                const { word, limit } = values;
                const _search = await axios.default({ baseURL: environment.IMGUR.SEARCH, method: 'GET', params: { q: word } });
                const { data } = _search;
                const lines = data.split(/\r?\n/);
                const urls = parseUrls(lines);

                for (var url of urls) {
                    if (limit && result.length == limit) {
                        break;
                    }

                    const id = url.replace('/gallery/', '').toString();
                    const _cache = await findCache(id);
                    if (_cache) {
                        const { response } = _cache;
                        result.push(response);
                        continue;
                    }

                    const toJSON = await parseJSON(url);
                    if (!toJSON) {
                        continue;
                    }

                    result.push(toJSON);

                    const newCache = new imgurModel({ id: id, response: toJSON });
                    newCache.save();
                }
            } catch (err) {
                reject(err);
            } finally {
                resolve(result);
            }
        });
    }

}

module.exports = new ImgurAPI();