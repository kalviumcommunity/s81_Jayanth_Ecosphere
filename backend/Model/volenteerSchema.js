let mongoose= require("mongoose")



const addressSchema=new mongoose.Schema({
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true

    },
    pincode:{
        type:Number,
        required:true
    },
    area:{
        type:String
    },
    addressType:{
        type:String
    }

})


const VolenteerSchema =new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["user","volenteer","admin"]
    },
    address:[{type:addressSchema}],
    isActivated:{
        type:Boolean,
        default:false
    },
   

})


const volenteerSchema =mongoose.model("volenteer",VolenteerSchema)

module.exports={volenteerSchema}