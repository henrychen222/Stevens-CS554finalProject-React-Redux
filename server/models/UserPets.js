const mongoose = require('mongoose');
const Pet = require('./Pet');

const UserPet = mongoose.model('userpets');

let exportedMethods = {

    async addPet(userid, petId){
        //console.log("data model: addPet"+userid+"  "+petId);
        let userPetInfo = {
            userGoogleId: userid,
            pet_id: petId,
            noOfTimesFed: 0,
            noOfTimesPetted:0,
            noOfTimesWalked: 0,
            happinessLevel: 0,
            currentDate: new Date()
        }
       // let execUpdate  = await UserPet.insertOne(userPetInfo);
        let addedPet=await new UserPet(userPetInfo).save();
        //console.log("addedPet "+addedPet);
        //let addedPetInfo=await getUserPet(userid, petId);
        let query  = UserPet.where({ userGoogleId: userid, "pet_id": petId }); 
        let addedPetInfo =await query.findOne();
        //console.log("addedPetInfo "+addedPetInfo);

        return addedPetInfo;


    },
    async getfedProgress(noOfTimesToBeFeeded,noOfTimesFed){
        let feedProgress= Math.round((noOfTimesFed/noOfTimesToBeFeeded)*100);
        //console.log(feedProgress);
        //console.log("typeof"+typeof(feedProgress));
        return feedProgress;

    },
    async getWalkProgress(noOfTimesToWalk,noOfTimesWalked){
        let walkProgress= Math.round((noOfTimesWalked/noOfTimesToWalk)*100);
        //console.log(walkProgress);
        //console.log("typeof"+typeof(walkProgress));
        return walkProgress;

    },
    async getPetProgress(noOfTimesToPet,noOfTimesPetted){
        let petProgress= Math.round((noOfTimesPetted/noOfTimesToPet)*100);
       // console.log(petProgress);
        //console.log("typeof"+typeof(walkProgress));
        return petProgress;

    },
    async getUserPets(user_id){
        let query  = UserPet.where({ userGoogleId: user_id }); 
        let userPets =await query.find();   

        return userPets;
    },
    
    async getUserPet(user_id, pet_id){
        //console.log("Inside getUserPet"+user_id+" "+pet_id);
        let query  = UserPet.where({ userGoogleId: user_id, "pet_id": pet_id }); 
        let userPet =await query.findOne();   
        return userPet;
    },
    async feedUserPet(user_id, pet_id){
        let pet = await Pet.getPet(pet_id);
        let query  = UserPet.where({ userGoogleId: user_id, "pet_id": pet_id }); 
        let userPet =await query.findOne();
        //console.log("userPet.noOfTimesFed"+userPet.noOfTimesFed);
        //console.log("pet.noOfTimesToFeed"+pet.noOfTimesToFeed);

        //let feedProgress=  getfedProgress(pet.noOfTimesToFeed, userpet.noOfTimesFed)
        let feedProgress= Math.round((userPet.noOfTimesFed/pet.noOfTimesToFeed)*100);

       // console.log("feedUserPet feedProgress"+feedProgress);
        if(feedProgress < 100){
            let execUpdate  = await UserPet.updateOne({ userGoogleId: user_id, "pet_id": pet_id }, 
        {$inc : { noOfTimesFed : 1 }});
        }
    },
    async walkUserPet(user_id, pet_id){
        //console.log("Inside walkUserPet"+user_id+" "+pet_id)
        let pet = await Pet.getPet(pet_id);
        let query  = UserPet.where({ userGoogleId: user_id, "pet_id": pet_id }); 
        let userPet =await query.findOne();
        let walkProgress= Math.round((userPet.noOfTimesWalked/pet.noOfTimesToWalk)*100);
        //console.log("walkUserPet walkProgress"+walkProgress);
        if(walkProgress < 100){
            let execUpdate  = await UserPet.updateOne({ userGoogleId: user_id, "pet_id": pet_id }, 
        {$inc : { noOfTimesWalked : 1 }}); 
        }
        
        //console.log("execUpdate "+JSON.stringify(execUpdate));
    },
    async petUserPet(user_id, pet_id){
       // console.log("Inside petUserpet"+user_id+" "+pet_id)
        let pet = await Pet.getPet(pet_id);
        let query  = UserPet.where({ userGoogleId: user_id, "pet_id": pet_id }); 
        let userPet =await query.findOne();
        let petProgress= Math.round((userPet.noOfTimesPetted/pet.noOfTimesToPet)*100);
        //console.log("petUserPet petProgress"+petProgress);
        if(petProgress < 100){

            let execUpdate  = await UserPet.updateOne({ userGoogleId: user_id, "pet_id": pet_id }, 
        {$inc : { noOfTimesPetted : 1 }}); 
        }
       // await updateUserPetHappiness(user_id,pet_id);
       // console.log("execUpdate "+JSON.stringify(execUpdate));
    },

    async updateUserPetHappiness(user_id, pet_id){
        //console.log("updateUserPetHappiness ");
        let query1  = UserPet.where({ userGoogleId: user_id, "pet_id": pet_id }); 
        let userPet1 =await query1.findOne();

        //console.log(JSON.stringify(userPet1));
        let x=userPet1.noOfTimesFed+userPet1.noOfTimesPetted+userPet1.noOfTimesWalked;
     
        let z  = await UserPet.updateOne({ userGoogleId: user_id, "pet_id": pet_id }, 
        {happinessLevel : x }); 

        
        //console.log("updateUserPetHappiness end ");
        //console.log(JSON.stringify(z));
    }
  
}

module.exports = exportedMethods;