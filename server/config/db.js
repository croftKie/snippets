const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected ${con.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;
