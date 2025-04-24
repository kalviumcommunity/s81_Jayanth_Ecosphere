const express=require("express")
const middleware=require("./middleware/error")
const cors=require("cors")
const cookieparser=require("cookie-parser")
const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173" ,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]

})
)
app.use(cookieparser())


const {userRoute} = require("./controllers/userRoute")
app.get("/test", async (req, res) => {
    res.status(200).json({message:"your running on machine"})
  });

console.log(userRoute)
app.use("/user",userRoute);




app.use(middleware)


module.exports = { app };  