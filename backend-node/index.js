const app = require("./app");
const cloudinary = require("cloudinary");
const dbConnect = require("./config/conectionDB.js");
// const dotenv = require("dotenv").config({ path: './config/.env.local' }); //dev 

const dotenv = require("dotenv").config({}); //  production
const PORT = process.env.PORT || 4000;



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


dbConnect();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

