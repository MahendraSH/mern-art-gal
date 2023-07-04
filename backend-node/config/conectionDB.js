const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.Mongodb_url,)
    .then((data) => {
            console.log("db connection  succesful ");
            // console.log(`Mongodb connected with server: ${data.connection.host}`);
            // console.log(`db connected : ${data.connection.name}`);
        }).catch((err) => {
            console.log(err);
        });
}

module.exports = dbConnect;
