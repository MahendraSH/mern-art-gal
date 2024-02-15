import { connect } from "mongoose";

const dbConnect = () => {
  connect(process.env.Mongodb_url)
    .then((data) => {
      console.log("db connection  successful ");
    //   console.log(`Mongodb connected with server: ${data.connection.host}`);
    //   console.log(`db connected : ${data.connection.name}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default dbConnect;
