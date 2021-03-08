const jwt = require('jsonwebtoken');
const config = require('../config/config');
const auth = (request, response, next) => {
    const token_header = request.headers.token;

    if(!token_header) {
        return response.send({
            status: 500,
            message: 'Faça login para acessar essa funcionalidade.',
        });
    }

    jwt.verify(token_header, config.pass_jwt, (error, decoded) => {
        if(error) {
            return response.
            status(401).
            send({
                message: 'Usuário não autorizado.',
            });
        }

        response.locals.auth_data = decoded;

        return next();
    });
}

module.exports = auth;