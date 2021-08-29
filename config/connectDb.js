const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/TTTN', {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log("Connect Mongdb successfully!!!")
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    connect
};