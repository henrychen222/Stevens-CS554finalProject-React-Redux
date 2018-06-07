# VirtualPetPal-Using-React-
Installation instructions:

Getting the code base:
Unzip the archive to your machine or clone/download from:
https://github.com/sowmyavj/VirtualPetPal-Using-React-

node_modules installation
There are two package.json files:
One under /server
Another at /server/client
In both these folders do “npm install”

ImageMagick installation
The project uses ImageMagick and hence you must have it installed in your machine. To install for mac do:
brew install imagemagick
You can also follow the instructions at: 
https://legacy.imagemagick.org/script/binary-releases.php

To run:
At /server path, type the command:
npm run dev

This will drop the old db, create a new one, put in the seed data and start the server and client

Test User:
The app uses google oauth and hence we created a test gmail account:
Id: virtualpetpaluser@gmail.com
Password: virtualpetpal
Please login with this 	account


