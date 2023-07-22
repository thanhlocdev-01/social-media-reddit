const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
dotenv.config();

//CONNECT DATABASE
mongoose.connect(process.env.DB_URL, () =>{
    console.log("CONNECTED TO MONGO DB");
});



app.use(express.json());
app.use(cors());
app.use(morgan("common"));


//Routes
app.use("/v1/auth", authRoute);
app.use("/v1/post", postRoute);
app.use("/v1/user", userRoute);

app.listen(8000,()=> {
    console.log("Sever is runing...")
})