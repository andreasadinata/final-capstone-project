exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://user:user@ds043942.mlab.com:43942/travel-plan-database'
exports.PORT = process.env.PORT || 3001;
