const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');

const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
    console.log('Database Connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const rand = Math.floor(Math.random() * 1000);
        const price =Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[rand].city}, ${cities[rand].state}`,
            geometry:{ type: 'Point', coordinates: [ cities[rand].longitude, cities[rand].latitude ] },
            images:[
                {
                  url: 'https://res.cloudinary.com/daybabj7u/image/upload/v1641390684/YelpCamp/pzkvcpzhlzfujemjthut.jpg',
                  filename: 'YelpCamp/pzkvcpzhlzfujemjthut'
                },
                {
                  url: 'https://res.cloudinary.com/daybabj7u/image/upload/v1641390689/YelpCamp/jfhazq4yvesgpbevslef.jpg',
                  filename: 'YelpCamp/jfhazq4yvesgpbevslef'
                },
                {
                  url: 'https://res.cloudinary.com/daybabj7u/image/upload/v1641390691/YelpCamp/sfkh9qvxcgq4xu7blnmo.jpg',
                  filename: 'YelpCamp/sfkh9qvxcgq4xu7blnmo'
                }
              ],
            author:'61aa80cdac0bb7d8fbe64ada',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis possimus laboriosam aliquid minus. Possimus aspernatur deleniti velit assumenda quidem minus id blanditiis laborum, dolorum officiis, rem maxime nisi enim eius?',
            price
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})