const{app} = require("./app")
require("dotenv").config()

const port=process.env.PORT



app.listen(port,async()=>{
    try{
        
        
        console.log(`app is running on http://localhost:${port}`)
    }
    catch(err){
        console.log(err)
    }
    
 })