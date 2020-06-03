const Restaurant = require('../models/takeoutSchema');

const restaurantController = {};

restaurantController.createUser = (req, res, next) => {
    Restaurant.create({
        restaurantName: req.body.restName,
        phoneNumber: req.body.phoneNumber,
    }, (err, user) => {
        if (err) return res.status(400).send('error creating database entry');
        console.log(`database entry for ${req.body.restName} successfully created`);
        return next();
    });
}

module.exports = restaurantController;