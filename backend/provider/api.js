var unirest = require('unirest')

module.exports = {

    getCharacters: () =>
        new Promise((resolve, reject) => {
            unirest('GET', process.env.API_URL + 'characters')
                .headers({ 'Content-Type': 'application/json' })
                .end(function (res) {
                    // console.log('res ',res)
                    if (res.length == 0) {
                        return reject(null);
                    } else {
                        return resolve(JSON.parse(res.raw_body));
                    }
                })
        }).catch(error => {
            console.log('error al consultar personajes ', error)
        })


}