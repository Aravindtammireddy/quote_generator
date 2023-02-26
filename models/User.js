const mongoose = require('mongoose')

const Userschema = mongoose.Schema({
    latitude : {
        type : Number , 
        required : [true,'please enter a valid location'],
        
    },
    longitude :
    {type : Number,
     required:[true,'please entee a valid location']},
    
    phonenumber : {
        type : String,
        required:[true,'please entee a valid phone number']
    }

})

module.exports = mongoose.model("User",Userschema);