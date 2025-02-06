const express = require("express");
const LoginRouter = require("./routes/authenticationRoute.js");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv")   
dotenv.config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/user", LoginRouter);
app.use(cookieParser());
app.use(bodyParser.json());
connectDB();

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
