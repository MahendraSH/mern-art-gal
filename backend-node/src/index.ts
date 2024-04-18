import cookieParser from "cookie-parser";
import Express from "express";
import cors from "cors";
import ExpressFileUpload from "express-fileupload";
import { config } from "dotenv";
import dbConnect from "./DB/connect";
import cloudinary from "cloudinary";
import userRoutes from "./routes/user-routes";
import errorController from "./middlewares/error-contollers";
const app = Express();

// .env config

config({ path: ".env" });

// middlewares
app.use(cookieParser());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
  const corsOptions: cors.CorsOptions = {
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (cookies)
  };
app.use(cors(corsOptions));
app.use(ExpressFileUpload());

//cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//   routes
app.use("/api/user", userRoutes);

//  error controllers
app.use(errorController);

// db connect

dbConnect();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
