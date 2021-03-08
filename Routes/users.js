const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('../config/config');

const createUserToken = (userId) => {
    return jwt.sign({ 
        id: userId,
    },
    config.pass_jwt,
    {
        expiresIn: config.life_jwt
    });
}

router.get('/', auth, async (request, response) => {
    try {
        const users = await User.find({});
        return response.send({
            status: 200, 
            message: '',
            data: users
        });

    } catch(error) {
        console.error('[error]: '+ error);
        return response.
        status(500).
        send({
            message: error,
        });
    }
});

router.post('/create', auth, async (request, response) => {
    const { mail, password } = request.body;
    if(!mail || !password) {
        return response.
        status(400).
        send({
            message: 'Dados insuficientes.',
            data: {},
        })
    }

    try {
        if(await User.findOne({mail})) {
            return response.send({
                message: 'Usuário já cadastrado.',
                data: {},
            });
        }

        const user = await User.create(request.body);
        user.password = undefined;
        
        return response.
        status(201).
        send({
            message: 'Usuário cadastrado com sucesso',
            data: {
                user: user,
                token: createUserToken(user.id)    
            },
        });
    } catch(error) {
        console.error('[error]: '+ error);
        return response.
        status(500).
        send({
            message: error,
        })
    }
});


router.post('/auth', async (request, response) => {
    const { mail, password } = request.body;

    if( !mail || !password ) {
        return res.
        status(401).
        send({
            message: 'Erro',
            data: {
                message: 'Dados insuficientes.'
            }
        });
    }

    try {
        const user = await User.findOne({mail}).select('+password');

        if(!user) {
            return response.
            status(401).
            send({
                message: 'Usuário já cadastrado.',
                data: {},
            });
        }

        const pwd = await bcrypt.compare(password, user.password);
        if(!pwd) {
            return response.
            status(401).
            send({
                message: 'Dados do usuário não conferem.',
                data: {},
            });
        }

        user.password = undefined;
        return response.
        status(200).
        send({
            message: 'Usuário autenticado.',
            data: {
                user: user,
                token: createUserToken(user.id)    
            },
        });

    } catch(error) {
        console.error('[error]: '+ error);
        return response.
        status(500).
        send({
            message: error,
        })
    }
});

module.exports = router;