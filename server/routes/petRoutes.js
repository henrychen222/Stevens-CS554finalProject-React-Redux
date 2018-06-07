const axios = require('axios');
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const UserPetModel = require('../models/UserPets');
const PetModel = require('../models/Pet');
const GoodieModel = require('../models/UserGoodies');
const UserModel = require('../models/User');
const async = require('async');
const maxworkers = require('os').cpus().length;

const Pet = mongoose.model('pets');
const UserPet = mongoose.model('userpets')
const http = require('https')

const bluebird = require("bluebird");

const im = require('imagemagick');
const fs = require('fs');

bluebird.promisifyAll(fs);
let petImagesFetched = false;

function resize(params) {
    var queue = async.queue(resizeimg, maxworkers);

    fs.readdir(params.src, function (err, files) {
        files.forEach(function (file) {
            queue.push({
                src: params.src + file,
                dest: params.dest + file,
                width: params.width,
                height: params.height
            })
        });
    });
}

function resizeimg(params, cb) {
    var imoptions = {
        srcPath: params.src,
        dstPath: params.dest
    };
    if (params.width !== undefined) imoptions.width = params.width;
    if (params.height !== undefined) imoptions.height = params.height;
    im.resize(imoptions, cb);
}

const populateImages = async () => {

    if (!petImagesFetched) {
        // console.log("No images available yet.. fetching")
        petImagesFetched = true;
        let path = process.cwd();
        path += "/client/public/images/";
        resize({
            src: path + "pets/",
            dest: path,
            width: 375,
            height: 286
        });
    }
}

module.exports = app => {
    app.get('/api/dashboard', requireLogin, async (req, res) => {
        populateImages();
        const userpets = await UserPet.find({ userGoogleId: req.user.googleId });
        let petIdlist = [];
        userpets.forEach(function (p) { petIdlist.push(p.pet_id); });
        let pets = await Pet.find({ "pet_id": { $in: petIdlist } });
        res.send(pets);

    });

    app.get('/api/type/:type', requireLogin, async (req, res) => {

        let type = req.params.type;
        console.log("/api/type/:type " + type);
        let pets = [];
        const userpets = await UserPet.find({ userGoogleId: req.user.googleId });
        let petIdlist = [];
        userpets.forEach(function (p) { petIdlist.push(p.pet_id); })
        if (type >= 0) {
            var query = Pet.where({ typeOfPet: type, "pet_id": { $nin: petIdlist } });
            pets = await query.find();
        }
        else {
            pets = await Pet.find({ "pet_id": { $nin: petIdlist } });
        }
        res.send(pets);


    });

    app.get('/api/userpet/:petId', requireLogin, async (req, res) => {
        let petId = req.params.petId;
        let userId = req.user.googleId;
        let userpet = {};
        let userpetInfo = await UserPetModel.getUserPet(userId, petId);
        if(userpetInfo){
        userpet._id = userpetInfo._id;
        userpet.userGoogleId = userpetInfo.userGoogleId;
        userpet.pet_id = userpetInfo.pet_id;
        userpet.noOfTimesFed = userpetInfo.noOfTimesFed;
        userpet.noOfTimesPetted = userpetInfo.noOfTimesPetted;
        userpet.noOfTimesWalked = userpetInfo.noOfTimesWalked;
        userpet.happinessLevel = userpetInfo.happinessLevel;
        userpet.currentDate = userpetInfo.currentDate;
        userpet.__v = userpetInfo.__v;
        
        


        let pet = await PetModel.getPet(petId);
        let feedProgress = await UserPetModel.getfedProgress(pet.noOfTimesToFeed, userpet.noOfTimesFed)
        let walkProgress = await UserPetModel.getWalkProgress(pet.noOfTimesToWalk, userpet.noOfTimesWalked)
        let petProgress = await UserPetModel.getPetProgress(pet.noOfTimesToPet, userpet.noOfTimesPetted)

        userpet.feedProgress = feedProgress;
        userpet.walkProgress = walkProgress;
        userpet.petProgress = petProgress;
        userpet['userspet'] = true;
        }
        res.send(userpet);
    });

    app.get('/api/pet/:petId', requireLogin, async (req, res) => {
        //console.log("Request!!!!!!!"+JSON.stringify(req.params));
        let petId = req.params.petId;
        //console.log(petId);
        var query = Pet.where({ pet_id: petId });
        let x = await query.findOne();
        let singlePet = {};
        singlePet.testimonials = x.testimonials;
        singlePet._id = x._id;
        singlePet.pet_id = x.pet_id;
        singlePet.name = x.name;
        singlePet.typeOfPet = x.typeOfPet;
        singlePet.gender = x.gender;
        singlePet.noOfTimesToFeed = x.noOfTimesToFeed;
        singlePet.noOfTimesToWalk = x.noOfTimesToWalk;
        singlePet.noOfTimesToPet = x.noOfTimesToPet;
        singlePet.profilephotoLink = x.profilephotoLink;
        singlePet.description = x.description;
        let userpets = await UserPetModel.getUserPets(req.user.googleId);
        let petIdlist = [];
        if(userpets){
            userpets.forEach(function (p) { petIdlist.push(p.pet_id); })
        }
        if (petIdlist.indexOf(singlePet.pet_id) > -1) {
            //console.log("This is users pet");
            singlePet['userspet'] = true;
        }
        else {
            //console.log("This is not users pet");
            singlePet['userspet'] = false;
        }
        res.send(singlePet);
    });

    app.post('/api/pet/feed/:petId', requireLogin, async (req, res) => {
        //console.log("inside post user pet");
        let petId = req.params.petId;
        let userId = req.user.googleId;
        const updatePetFeed = await UserPetModel.feedUserPet(userId, petId);
        await UserPetModel.updateUserPetHappiness(userId, petId);
        let userpet = {};
        let userpetInfo = await UserPetModel.getUserPet(userId, petId);
        userpet._id = userpetInfo._id;
        userpet.userGoogleId = userpetInfo.userGoogleId;
        userpet.pet_id = userpetInfo.pet_id;
        userpet.noOfTimesFed = userpetInfo.noOfTimesFed;
        userpet.noOfTimesPetted = userpetInfo.noOfTimesPetted;
        userpet.noOfTimesWalked = userpetInfo.noOfTimesWalked;
        userpet.happinessLevel = userpetInfo.happinessLevel;
        userpet.currentDate = userpetInfo.currentDate;
        userpet.__v = userpetInfo.__v;


        let pet = await PetModel.getPet(petId);
        let feedProgress = await UserPetModel.getfedProgress(pet.noOfTimesToFeed, userpet.noOfTimesFed)
        //console.log("feedProgress "+feedProgress);
        let walkProgress = await UserPetModel.getWalkProgress(pet.noOfTimesToWalk, userpet.noOfTimesWalked)
        let petProgress = await UserPetModel.getPetProgress(pet.noOfTimesToPet, userpet.noOfTimesPetted)

        userpet.feedProgress = feedProgress;
        userpet.walkProgress = walkProgress;
        userpet.petProgress = petProgress;
        userpet['userspet'] = true;

        //console.log("post userpet"+userpet);
        res.send(userpet);
    });

    app.post('/api/pet/pet/:petId', requireLogin, async (req, res) => {
        // console.log("/api/pet/pet/:petId ");
        let petId = req.params.petId;
        let userId = req.user.googleId;

        const updatePetFeed = await UserPetModel.petUserPet(userId, petId);
        await UserPetModel.updateUserPetHappiness(userId, petId);
        // console.log("/api/pet/pet/:petId 111 "+updatePetFeed);
        let userpet = {};
        let userpetInfo = await UserPetModel.getUserPet(userId, petId);
        userpet._id = userpetInfo._id;
        userpet.userGoogleId = userpetInfo.userGoogleId;
        userpet.pet_id = userpetInfo.pet_id;
        userpet.noOfTimesFed = userpetInfo.noOfTimesFed;
        userpet.noOfTimesPetted = userpetInfo.noOfTimesPetted;
        userpet.noOfTimesWalked = userpetInfo.noOfTimesWalked;
        userpet.happinessLevel = userpetInfo.happinessLevel;
        userpet.currentDate = userpetInfo.currentDate;
        userpet.__v = userpetInfo.__v;


        let pet = await PetModel.getPet(petId);
        let feedProgress = await UserPetModel.getfedProgress(pet.noOfTimesToFeed, userpet.noOfTimesFed)
        //console.log("feedProgress "+feedProgress);
        let walkProgress = await UserPetModel.getWalkProgress(pet.noOfTimesToWalk, userpet.noOfTimesWalked)
        //console.log("feedProgress "+feedProgress);
        let petProgress = await UserPetModel.getPetProgress(pet.noOfTimesToPet, userpet.noOfTimesPetted)

        userpet.feedProgress = feedProgress;
        userpet.walkProgress = walkProgress;
        userpet.petProgress = petProgress;
        userpet['userspet'] = true;

        res.send(userpet);
    });

    app.post('/api/pet/walk/:petId', requireLogin, async (req, res) => {
        let petId = req.params.petId;
        let userId = req.user.googleId;
        const updatePetFeed = await UserPetModel.walkUserPet(userId, petId);
        await UserPetModel.updateUserPetHappiness(userId, petId);
        let userpet = {};
        let userpetInfo = await UserPetModel.getUserPet(userId, petId);
        userpet._id = userpetInfo._id;
        userpet.userGoogleId = userpetInfo.userGoogleId;
        userpet.pet_id = userpetInfo.pet_id;
        userpet.noOfTimesFed = userpetInfo.noOfTimesFed;
        userpet.noOfTimesPetted = userpetInfo.noOfTimesPetted;
        userpet.noOfTimesWalked = userpetInfo.noOfTimesWalked;
        userpet.happinessLevel = userpetInfo.happinessLevel;
        userpet.currentDate = userpetInfo.currentDate;
        userpet.__v = userpetInfo.__v;


        let pet = await PetModel.getPet(petId);

        let feedProgress = await UserPetModel.getfedProgress(pet.noOfTimesToFeed, userpet.noOfTimesFed)
        //console.log("feedProgress "+feedProgress);
        let walkProgress = await UserPetModel.getWalkProgress(pet.noOfTimesToWalk, userpet.noOfTimesWalked)
        let petProgress = await UserPetModel.getPetProgress(pet.noOfTimesToPet, userpet.noOfTimesPetted)

        userpet.feedProgress = feedProgress;
        userpet.walkProgress = walkProgress;
        userpet.petProgress = petProgress;
        userpet['userspet'] = true;

        res.send(userpet);
    });
    app.post('/api/pet/add/:petId', requireLogin, async (req, res) => {

        let petId = req.params.petId;
        let userId = req.user.googleId;
        //console.log("Server route addPet "+petId);
        let userpet = {};

        const addedUserPetInfo = await UserPetModel.addPet(userId, petId);
        userpet._id = addedUserPetInfo._id;
        userpet.userGoogleId = addedUserPetInfo.userGoogleId;
        userpet.pet_id = addedUserPetInfo.pet_id;
        userpet.noOfTimesFed = addedUserPetInfo.noOfTimesFed;
        userpet.noOfTimesPetted = addedUserPetInfo.noOfTimesPetted;
        userpet.noOfTimesWalked = addedUserPetInfo.noOfTimesWalked;
        userpet.happinessLevel = addedUserPetInfo.happinessLevel;
        userpet.currentDate = addedUserPetInfo.currentDate;
        userpet.feedProgress = 0;
        userpet.walkProgress = 0;
        userpet.petProgress = 0;
        userpet['userspet'] = true;

        //console.log("Post add pet: "+JSON.stringify(userpet));
        res.send(userpet);

    });

    app.post('/api/addgoodies', requireLogin, async (req, res) => {

        let user = req.user;
        let products = req.body.products;
        //console.log(products);
        //console.log(products[0]);
        let userCredits = await UserModel.getUserCredits(user.googleId);
        let total_price = 0;
        for (var i = 0; i < products.length; i++) {
            let id = products[i].id;
            let quantity = products[i].quantity;
            let price = products[i].price;
            total_price += (price * quantity);

        }
        console.log("Total price" + total_price);
        if (total_price <= userCredits) {
            for (var i = 0; i < products.length; i++) {
                let goodie = {};
                let id = products[i].id;
                let q = products[i].quantity
                let addedgoodie = await GoodieModel.addGoodie(user.googleId, id, q);
                //console.log(user);
                //console.log(products);
                //console.log(id);
                //console.log(q);
            }
            let userGoodies = await GoodieModel.getUserGoodie(user.googleId);
            let userGoodies_JSON = {};
            userGoodies_JSON._id = userGoodies._id,
                userGoodies_JSON.userGoogleId = userGoodies.userGoogleId,
                userGoodies_JSON.goodie_id = userGoodies.goodie_id,
                userGoodies_JSON.quantity = userGoodies.quantity,
                userGoodies_JSON.__v = userGoodies.__v;

            let updateCredits = await UserModel.updateUserCredits(user.googleId, total_price);
            res.send(userGoodies_JSON);

        } else {
            res.send({});

        }
    });


};