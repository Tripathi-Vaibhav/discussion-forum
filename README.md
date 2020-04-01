## Discussion-forum

------------ 

### Tech

* FrontEnd
  * HTML
  * CSS

* BackEnd
  *  NodeJS
  * mongoose

------------

### Dependancies

* Bootstrap
* express
* ejs
* body-parser

------------

### Quick Setup

* clone the repository
* open [bash](https://git-scm.com/downloads) or [hyper](https://hyper.is/)
* jump to project folder
* run `npm init`
* install dependancies (if not present in `package.json`) and run `npm i express ejs body-parser` to add them
* install [robo 3T](https://robomongo.org/download) (a graphical form for monodb CRUD operations)

------------

### Database setup

* Install [mongodb](https://www.mongodb.com/download-center/community) 
* Follow this [article](https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514) to install mongodb on windows.
* run `mongo --version` to check if mongodb installed successfully 

------------

### For the first time

* open app.js inside project folder
* uncomment the lines given in start of this file and save the file
  (basically to store dummy admin username and password)
* open hyper and jump to the project directory
* run `node app.js`
* The server must now be running at http://localhost:3000
* quit the server in hyper `ctrl + c`
* launch robo 3t
* check inside `adminDB` database and inside it `adminlogins` collections
* right click and go to `view documents`
* admin credentials must be present

------------

### Quick instructions after every launch

* open hyper and go to project folder
* run `node app.js`
* run `ctrl + t` to open up another tab
* run `mongod` server
* the frontend must be visible at http://localhost:3000
