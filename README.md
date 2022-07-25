
## Venue Booking

<<<<<<< HEAD
A web application to book venue in university. It is specifically designed for JUIT. It stores the booking database in MongoDB.
=======
A web application to book venue in university. It is specifically designed for JUIT.

>>>>>>> 0fa1499b52d0be945556e1f2e062b1ef8758f4cf
## Features

- Can add or delete rooms.
- If anyone else has booked the room between given time, it will show error and booking will not be made.


## Requirement

- MongoDB (locally)
- NodeJS

If you want to use remote MongoDB server, then you need to change the url in the app.js and server.js file. 
## Run Locally

Clone the project

```bash
  git clone https://github.com/AakarshanSingh/portfolio
```

Go to the project directory

```bash
  cd venuebooking
```

Install dependencies

```bash
  npm install bcrypt bcryptjs body-parser connect-mongodb-session express express-session hbs js jsonwebtoken mongoose mysql path time-to-seconds 
```
  
  Start the server

```bash
  npm start
```


## Authors

- [@AakarshanSingh](https://github.com/AakarshanSingh)

