const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

//connect Database
connectDB();

//Middlewares
app.use(express.json({ extended: false })); //allows us to get the data from req.body

//routes
require('./routes')(app);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => console.log(`Server run on ${PORT}`));
