const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressFileUpload = require('express-fileupload');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'https://mern-assigment.vercel.app' })); // production
// app.use(cors({ credentials: true, origin: 'http://localhost:5173' })); // dev 
app.use(cookieParser());
app.use(expressFileUpload());

//  routes 
app.use('/api/user', require('./routers/userRoutes.js'));
app.use('/api/post', require('./routers/GalaryRoutes.js'));

// error handling 
app.use(require('./middlewares/errorController.js'));



module.exports = app;

