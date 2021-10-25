const dontenv = require('dotenv');
const assert = require('assert');

dontenv.config();
const {PORT, SQL_USER, SQL_PASSWORD, SQL_DB, SQL_SERVER, SQL_DB_HIS} = process.env;

const sqlEncrypt = process.env.ENCRYPT === 'true'
assert(PORT, 'PORT is required');

module.exports = {
    port: PORT,
    sql:{
        server:SQL_SERVER,
        database : SQL_DB,
        user : SQL_USER,
        password : SQL_PASSWORD,
        driver: 'tedious',
        dialect: 'mssql',
        dialectOptions:{
            ìnstanceName : "SQLEXPRESS"
        },
        options:{
            trustedConnection : true,
            enableArithAbort : true,
            trustServerCertificate: true,
            encrypt : true
            
        }
       
    },
}