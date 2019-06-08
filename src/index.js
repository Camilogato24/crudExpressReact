const express = require('express'); 
const app = express();
const path = require('path');


// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());


// Routes
app.use('/api/peticiones', require('./routes/users'));
app.use('/api/buscar', require('./routes/buscar'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));


// Starting de server
//app.listen(3000, () => {
    app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
}); 