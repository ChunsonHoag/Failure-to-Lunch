const Restaurant = require('../models/takeoutSchema');

const restaurantController = {};

restaurantController.createRestaurant = (req, res, next) => {
    Restaurant.create({
        restaurantName: req.body.restName,
        phoneNumber: req.body.phoneNumber,
    }, (err, user) => {
        if (err) return res.status(400).send(`database entry could not be created. reason: ${err}`);
        console.log(`database entry for ${req.body.restName} successfully created`);
        return next();
    });

}

//get all restaurants
restaurantController.getAllRestaurants = (req, res, next) => {
    Restaurant.find({}, (err, restaurants) => {
        if (err) return res.status(400).send('error getting  all restaurants');
        res.locals.restaurants = restaurants;
         console.log(`successfully retrieved list of restaurants`);
        return next();
    })
}
//get random restaurant
restaurantController.getRandomRestaurant = (req, res, next) => {
   let length = res.locals.restaurants.length;
   let randomNumber = Math.floor(Math.random() * Math.floor(length));
   res.locals.todaysLunch = res.locals.restaurants[randomNumber];
//    console.log(`Today's takeout spot is ${res.locals.todaysLunch.restaurantName}`);
   return next();
}
//update restaurant
restaurantController.updateRestaurantName = (req, res, next) => {
    Restaurant.findOneAndUpdate({restaurantName: req.body.restName},{restaurantName: req.body.updateName}, (err, restaurants) => {
        if (err) return res.status(400).send('error getting  all restaurants');
         console.log(`successfully updated ${req.body.updateName}`);
        return next();
    });
}

delete restaurant
restaurantController.deleteRestaurant = (req, res, next) => {
    Restaurant.findOneAndDelete({restaurantName: req.body.deleteName}, (err, restaurants) => {
        if (err) return res.status(400).send('error getting  all restaurants');
         console.log(`successfully deleted ${req.body.updateName}`);
        return next();
    });
}

module.exports = restaurantController;