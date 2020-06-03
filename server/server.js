const express = require('express');
const path = require('path');
const connectDB = require('../dbConnect');
const bodyParser = require('body-parser');

const restaurantController = require('./controllers/restaurantController');
const app = express();
const port = 3000;

connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.sendFile(path.resolve('client', 'index.html')));

app.post('/', restaurantController.createUser, (req, res) => res.status(200).redirect('/'));

app.use('*', (req,res) => {
    res.status(404).send('Not Found');
  });


app.listen(port, () => console.log(`app listening at http://localhost:${port}`))