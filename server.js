const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const path = require('path'); //the path module provides a way of working with directories and file patchs.

//connect Database
connectDB();

//Middlewares
app.use(express.json({ extended: false })); //allows us to get the data from req.body

//routes
require('./routes')(app);

//Serve static assests in production  (for deployment to Heroku)
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  //serve or send index.html in client as static file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); // path.resolve() is to resolve path into an absolute path.
  });
}

app.listen(PORT, () => console.log(`Server run on ${PORT}`));
