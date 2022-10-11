

module.exports = {
    
    dev: {
        connectionString: 'postgres://postgres:postgrespw@localhost:55000/artistlist',
        PORT: 8002
    },
    
    production: {
        connectionString: 'postgres://artists_sql_user:O8ysXhzuZyky48XwZU077lnAfo0Xw7no@dpg-cd2tc702i3mvvgbp5hl0-a.oregon-postgres.render.com/artists_sql' + "?ssl=true",
        port: process.env.PORT
    }
}