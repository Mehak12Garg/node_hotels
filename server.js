const express = require('express')
const app = express();
const db=require('./ds');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Index Route
app.get('/', function (req, res) {
  res.send('Hello Sir/Mam,Welcome to my hotel how can i help you!');
})

// Import the router files
const personRoutes = require('./routes/personRoutes');
// Use the routers
app.use('/person', personRoutes);

const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes);
app.listen(3000,()=>{
    console.log("App is listening on the port 3000");
})