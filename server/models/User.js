const mongoose=require('mongoose');
const { Schema } = mongoose;
//Create User schema
const UserSchema = new Schema({
    googleId: String,
    credits: {  type : Number,
                default : 10
    }
});

//Create a new collection - users
const User = mongoose.model('users',UserSchema);

let exportedMethods = {
    async getUserCredits(googleId){
        let existingUserDetails=await User.findOne({ googleId: googleId });
        let credits= existingUserDetails.credits;
        //console.log("Credits:"+credits);
        return credits;
    },
    async updateUserCredits(googleId, reduceUserCreditsAmount){

        let amount = -reduceUserCreditsAmount;
        //console.log("amount"+amount);
        let updateUsercredits=await User.updateOne({ "googleId": googleId },
        {$inc :{credits : amount}});
        
    }
}
module.exports = exportedMethods;