const mongoose=require('mongoose');
const Pet = mongoose.model('pets');


let exportedMethods = {
    async getPet(petId){
        let query  = Pet.where({ pet_id: petId }); 
        let petInfo =await query.findOne();   
        return petInfo;
    }

}

module.exports = exportedMethods;