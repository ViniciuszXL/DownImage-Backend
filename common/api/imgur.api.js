const axios = require('axios');
const cheerio = require('cheerio');

// Environment //
const environment = require('../environment');

class ImgurAPI {

    parseJSON = (json) => {
        return new Promise((resolve, reject) => {
            try {
                var text = '';
                for (var word of json) {
                    text = text + word;
                }

                resolve(text);
            } catch (err) {
                reject(err);
            }
        });
    }

    searchImages = (url) => {
        return new Promise(async (resolve, reject) => {

            axios.default({
                method: 'GET',
                url: `${ environment.IMGUR.BASE + url }`,
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err));
        });
    }

    search = (word) => {

        const parseLine = (line) => {
            line = line.substr(33, line.length);
            line = line.replace(' data-page="0">', '');
            line = line.substr(0, line.length - 1);
            return line;
        }

        return new Promise(async (resolve, reject) => {
            var result = undefined;

            try {
                const _search = await axios.default({ baseURL: environment.IMGUR.SEARCH, method: 'GET', params: { q: word } });
                const { data } = _search;
                const lines = data.split(/\r?\n/);
                var url = undefined;
    
                lines.forEach((line) => {
                    line = line.toString().trim();
                    if (line.includes('href="/gallery/')) {
                        line = parseLine(line);
                        if (url != undefined) return;
                        url = line;
                    }
                });
    
                const _searchImages = await this.searchImages(url);
                const $ = cheerio.load(_searchImages);

                $('script').each(function (i, element) {
                    if (i !== 0) return;

                    const children = element.children[0];
                    const { data } = children;
                    const _json = data.replace('window.postDataJSON=', "");
                    result = `'${ JSON.parse(_json) }';`;
                });
            } catch (err) {
                reject(err);
            } finally {
                const parsed = await this.parseJSON(result);
                console.log(parsed.id);

                resolve(result);
            }
        });
    }

}

module.exports = new ImgurAPI();