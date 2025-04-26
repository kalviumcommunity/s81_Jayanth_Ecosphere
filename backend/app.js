const express=require("express")
const middleware=require("./middleware/error")
const cors=require("cors")
const cookieparser=require("cookie-parser")
const path = require('path');
const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));
app.use(cookieparser())


const {userRoute} = require("./controllers/userRoute")
const {volenteerRoute} = require("./controllers/volenteerRoute")
app.get("/test", async (req, res) => {
    res.status(200).json({message:"your running on machine"})
  });

console.log(userRoute)
app.use("/user",userRoute);
app.use("/volen",volenteerRoute)


app.use('/profile-photo', express.static(path.join(__dirname, 'upload')));

app.use(middleware)


module.exports = { app };  