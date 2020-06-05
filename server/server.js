const express = require('express');
const path = require('path');
const connectDB = require('../dbConnect');
const bodyParser = require('body-parser');

const restaurantController = require('./controllers/restaurantController');
const app = express();
const port = 3000;

connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist/bundle.js')));
app.get('/', (req, res) => res.sendFile(path.resolve('client', 'index.html')));

app.post('/', restaurantController.createRestaurant, (req, res) => res.status(200).redirect('/'));

app.get('/restaurants', restaurantController.getAllRestaurants, restaurantController.getRandomRestaurant, (req, res) => {
  res.send(`Today's takeout spot will be ${res.locals.todaysLunch.restaurantName}. The phone Number is ${res.locals.todaysLunch.phoneNumber}`);
});

app.post('/update', restaurantController.updateRestaurantName, (req, res) => {
  console.log(`${req.body.restName} successfully updated to ${req.body.updateName}`);
  res.status(200).redirect('/')
});

app.post('/delete', restaurantController.deleteRestaurant, (req, res) => {
  console.log(`${req.body.deleteName} successfully deleted`);
  res.status(200).redirect('/')
});

app.use('*', (req,res) => {
    res.status(404).send('Not Found');
  });


app.listen(port, () => console.log(`app listening at http://localhost:${port}`))