const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); //helps express manage cookies
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User'); 
//require('./models/Pet'); 
//require('./models/UserPets'); 
const initDB= require('./models/initDb'); 
require('./services/passport');


//mongoose.connect(keys.mongoURI);
mongoose.connect(keys.mongoURI,function(){
		/* Drop the DB */
		//Drop db
		console.log("dropping db"); 
		mongoose.connection.db.dropDatabase();
		initDB.initPets();
		initDB.initUserPets();

});
const authRoutes = require('./routes/authRoutes');	

const app= express();
app.use(bodyParser.json())
app.use(
	cookieSession({
	  maxAge: 30 * 24 * 60 * 60 * 1000,
	  keys: [keys.cookieKey]
	})
  );
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/petRoutes')(app);
require('./routes/userGoodiesRoutes')(app);


const PORT = 5000;
app.listen(PORT);