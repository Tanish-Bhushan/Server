const app = require("./app");
const dotenv = require("dotenv");
const connectDataBase = require("./config/database");
const cloudinary = require("cloudinary");

//handling uncaughtException
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.messsage}`);
  console.log(`Shutting down server due to uncaught Exception...`);
  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });

//connecting DB
connectDataBase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});

//unhandled errors
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.messsage}`);
  console.log(`Shutting down server due to unhandled promise rejection ...`);
  server.close(() => {
    process.exit(1);
  });
});
