const express = require("express");
const LoginRouter = require("./routes/authenticationRoute.js");
const connectDB = require("./config/db.js");
const cors = require("cors");
const dotenv = require("dotenv")   
dotenv.config();
const cookieParser = require("cookie-parser");
const EventRouter = require("./routes/eventRoute.js");
const app = express();
const port = 3000;

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));    
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());




app.use("/user", LoginRouter);
app.use("/event", EventRouter);






connectDB();

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
