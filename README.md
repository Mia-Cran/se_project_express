# WTWR Backend

This project is the backend for the WTWR (What to Wear?) application. It handles storing and managing users and clothing items through a REST API connected to MongoDB.

The server allows users to:

* create and view user profiles
* add clothing items
* delete clothing items
* like and unlike items
* retrieve users and clothing data from the database

## Deployed Project

Frontend: https://maria-wtwr.jumpingcrab.com

Backend API: https://api.maria-wtwr.jumpingcrab.com

Frontend GitHub Repository: https://github.com/Mia-Cran/se_project_react

Project Pitch Video: https://drive.google.com/file/d/1FFP9MMLMoO-AWHjVy0Ns6Cu43_VLxcXR/view?usp=sharing

## Main Routes

### Users

* `GET /users` — returns all users
* `GET /users/:userId` — returns a user by ID
* `POST /users` — creates a new user

### Clothing Items

* `GET /items` — returns all clothing items
* `GET /items/:itemId` — returns a clothing item by ID
* `POST /items` — creates a new clothing item
* `DELETE /items/:itemId` — deletes a clothing item
* `PUT /items/:itemId/likes` — likes an item
* `DELETE /items/:itemId/likes` — removes a like from an item

## Technologies Used

This project was built using:

* Node.js
* Express.js
* MongoDB
* Mongoose
* ESLint
* Nodemon
* Validator.js
* Celebrate/Joi
* Winston
* PM2
* NGINX
* Certbot/SSL

## Error Handling

The server includes custom error handling for:

* invalid request data
* invalid MongoDB IDs
* missing routes/resources
* duplicate emails
* unauthorized requests
* general server errors

## Running the Project

```bash
npm install
npm run dev
```

The routes and error handling were tested using Thunder Client/Postman.
