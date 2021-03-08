const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({
        status: 200,
        message: 'Sucesso',
        data: {
            message: 'Metodo [get]/ OK.'
        }
    })
});


router.post('/', (req, res) => {
    return res.send({
        status: 200,
        message: 'Sucesso',
        data: {
            message: 'Metodo [post]/ OK.'
        }
    })
});

module.exports = router;