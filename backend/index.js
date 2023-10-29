const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const { cloudinary } = require("./utils/cloudinary");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
const newsRoute = require("./routes/news");

dotenv.config();

//CONNECT DATABASE
mongoose.connect(process.env.DB_URL, () =>{
    console.log("CONNECTED TO MONGO DB");
});



app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());
app.use(cookieParser());
app.use(morgan("common"));


//Routes
app.use("/v1/auth", authRoute);
app.use("/v1/post", postRoute);
app.use("/v1/user", userRoute);
app.use("/v1/news", newsRoute);


app.listen(8000,()=> {
    console.log("Sever is runing...")
})