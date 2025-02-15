/**
 * Puerto del host
 */
process.env.PORT = process.env.PORT || 3004

/**
 * Puerto del MongoDB 
 */
process.env.MONGO_SERVICE_PORT = process.env.MONGO_SERVICE_PORT || 27017

/**
 * Host
 */
process.env.MONGO_SERVICE_HOST = process.env.MONGO_SERVICE_HOST || 'localhost'

/**
 * Entorno de desarrollo
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev1'

/**
 * Host de la Base de Datos
 */
let URL_MONGODB =  "mongodb+srv://usertest:js123456@mscarrito-fr90b.mongodb.net/auth?retryWrites=true&w=majority"
process.env.DATABASE_URL = process.env.NODE_ENV === 'dev'? "mongodb://localhost:27017/local" : URL_MONGODB

// process.env.DATABASE_URL = 'mongodb://'+process.env.MONGO_SERVICE_HOST+':'+process.env.MONGO_SERVICE_PORT+'/test';

process.env.JWT_SECRET = process.env.JWT_SECRET || "I55HmmamZTFSi7KO76oC2mdGPNLOPK9ioU6RICpsXvt37sflNcJODMfL6rAEs0IE"

