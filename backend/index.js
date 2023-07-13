const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan")
dotenv.config();

//CONNECT DATABASE
mongoose.connect(process.env.DB_URL, () =>{
    console.log("CONNECTED TO MONGO DB");
})


app.use(express.json());
app.use(cors());
app.use(morgan("common"));


//Route
app.post("/v1/auth", (rep, res) => {
})
// app.post("/v1/update", (req, res)=> {
//     setTimeout(() => {
//         res.status(200).json(req.body);
//     },[1000])
// })

app.listen(8000,()=>{
    console.log("Sever is runing...")
})