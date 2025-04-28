const{app} = require("./app")
require("dotenv").config()
const connection=require("./db/connection")
require("./config/passport.js")
const port=process.env.PORT



app.listen(port,async()=>{
    try{
        
        console.log(`app is running on http://localhost:${port}`)
        connection
    }
    catch(err){
        console.log(err)
    }
    
 })