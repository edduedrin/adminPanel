var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ownerSchema = new Schema({
    businessOwnerName:{
        type:String,
        required:true
    },
    shopName:{
        type:String,
        required: true
    },
    mobNumber:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    shopPhotos:{
        type:String,
        required:true
    },
    levelOfInterest:{
        type:String,
        required:true
    },
    mobNumber:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('owners',ownerSchema);