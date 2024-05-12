const mongoose = require('mongoose');


exports.connectMongoose = () => {
    mongoose.connect('mongodb://localhost:27017/city')
    .then((e) => console.log(`Connectd to mongoDB:${e.connection.host}`))
    .catch((e) => console.log(e));
};