# Airport Manager
 A small web-based application built in React.JS and CakePHP enabling basic management of airports, airlines and their flight schedules.

 # How to set it up
* clone this repo `$ git clone git@github.com:OsamaShabrez/AirportManager.git`
* `$ cd AirportManager/backend/`
* `$ composer install`
* `$ bin/cake server` to start the PHP backend server. _If the command fails, ensure that `bin/cake` is executable. On *nix and macOS you can execute:_ `$ chmod +x bin/cake`
* `cd ../frontend/`
* `$ npm install`
* `$ npm start` this will start react.JS frontend and the webpage should open in a browser window. Otherwise, open local URL as shown in the console.

# Things that can be improved
* Auth Implementation is pretty basic.
    - Users can be managed at `/users` without any authentication
    - Authorization token for the user is hardcoded into the front-end application `frontend/src/Components/App.js` but the authentication does work obviously.
* API Request optimization. For instance, the country list is fetched on every screen. It can be done on once inside App and passed down as props. Considering the nature of this application I decided not to do it so we can see data moving between the server and the client.
* CSS Optimization. The UI although looks acceptable can be improved around country flags and for mobile devices. At the moment it is made for big screens.
* Google Maps API can be improved to appear more fluid. Also if you switch between `/airports` and other pages, pending requests would still go through. Opened an issue for the used library here: https://github.com/fullstackreact/google-maps-react/issues/248
* CakePHP does not act nice with composite primary keys. In terms of database design composite primary keys should be avoided but since I had made the choice already so I wrote the code to make it work. This is something I am not very proud of in this project
* Business logic can be improved in some places. Error messages can be handled better. Try flying and landing at the same airport ;)
* A lot of room for improvement to make it bulletproof from all angels but it is outside the scope of this project

![Application Demo](https://raw.githubusercontent.com/OsamaShabrez/AirportManager/master/demo.png)
