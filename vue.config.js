const fs = require('fs')

module.exports = {
    devServer: {
        port: 8888,
        disableHostCheck: true,
        https: {
            key: fs.readFileSync('./public/ssl/server.key'),
            cert: fs.readFileSync('./public/ssl/server.crt')
        }
    },
};