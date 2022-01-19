const express = require('express');
const app = express();
const path = require('path');
const port = 3005;




/* Configuraciones */

app.use(
    express.static(path.resolve(__dirname, '../public'))
    );
    
    
/* configuración de views ejs */
    
    app.set('view engine', 'ejs');
    app.set('views', path.resolve(__dirname, 'views'));
    
/* test */
    
    const main = require('./routers/test');
    app.use('/',main);

/* configuración del puerto*/

app.listen(port, ()=> 
    console.log('Servidor corriendo en el puerto ' + port)
)

