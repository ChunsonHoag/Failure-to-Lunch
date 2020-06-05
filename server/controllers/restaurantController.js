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
    const {restName, updateName} = req.body;
    Restaurant.updateOne({restaurantName: restName},{restaurantName: updateName}, (err, result) => {
        if (err) return res.status(400).send('error updating restaurant');
        if (result.nModified === 0) return res.status(404).send(`${restName} does not exist or couldn't be updated`);
        return next();
    });
}

// delete restaurant
restaurantController.deleteRestaurant = (req, res, next) => {
    const {deleteName} = req.body;
    Restaurant.deleteOne({restaurantName: deleteName}, (err, result) => {
        if (err) {
            console.log('Error deleting student');
            return res.status(400).send(`${deleteName} does not exist`);
        };
        if(result.deletedCount === 0) return res.status(404).send(`${deleteName} does not exist`);
        return next();
    });
}

module.exports = restaurantController;