

module.exports = {
    
    dev: {
        connectionString: 'postgres://postgres:postgrespw@localhost:55000/artistlist',
        PORT: 8002
    },
    
    production: {
        connectionString: proccess.env.POSTGRES_CONNECTION_STRING + "?ssl=true",
        port: process.env.PORT
    }
}