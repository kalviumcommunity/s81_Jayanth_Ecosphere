const express=require("express")
const app = express();
app.use(express.json());


const {userRoute} = require("./controllers/userRoute")
app.get("/test", async (req, res) => {
    res.status(200).json({message:"your running on machine"})
  });


  app.use("/user",userRoute)


  module.exports = { app };  