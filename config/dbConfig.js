module.exports = {
    connection : {
        connectionLimit : 30,
        port     : process.env.DBPORT, 
        host     : process.env.DBHOST, 
        username : process.env.DBUSER, 
        password : process.env.DBPASS, 
        database : process.env.DBNAME,
        dialect : process.env.DIALECT,
        debug    :  false
    }
};