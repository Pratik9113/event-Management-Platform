const express = require("express");
const LoginRouter = require("./routes/authenticationRoute.js");
const connectDB = require("./config/db.js");
const cors = require("cors");
const dotenv = require("dotenv")   
dotenv.config();
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));    
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/user", LoginRouter);
app.use(cookieParser());

connectDB();

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
