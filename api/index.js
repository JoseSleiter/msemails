'use strict';

require('./src/config/config.js')
const mongoose = require('mongoose')
const app = require('./src/app')

// app.get('*', function (req, res) {
//     res.status(404).send('Este es el home');
//     console.log("Página de inicio...")
//   })

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect( process.env.DATABASE_URL, {useNewUrlParser: true})
.then(( ) => {
    console.log(`La conexión a la base de datos local se ha realizado correctamente `)        

    app.listen(process.env.PORT, () => {
        console.log("esto esta en el puerto %d-%s", process.env.PORT, "msclientes")
    })
})
.catch(err => console.log(err))