const env = process.env.NODE_ENV || 'dev';

const config = () => {

    switch(env) {
        case 'dev':
            return {
                db: 'mongodb+srv://usr_adm_apinodejs:senha-bem-dificil-123@cluster-nodejs.gseb6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
                pass_jwt: 'senhaTokenJWTApiNodeDEV',
                life_jwt: '7d'
            }
        
        case 'pro':
            return {
                db: 'mongodb+srv://usr_adm_apinodejs:senha-bem-dificil-123@cluster-nodejs.gseb6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
                pass_jwt: 'senhaTokenJWTApiNodePRO',
                life_jwt: '1d'
            }
    }
}

console.log(`carregando configuracoes de ${env.toUpperCase()}`);
module.exports = config();