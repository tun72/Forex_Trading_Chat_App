# IRIS Code In 107 Task-2 

## Installation Steps:

1. Install nodejs and npm on your device.
2. Clone the repository to your local system.
3. In the root folder, create a '.env' file.
4. Create a MongoDB server and get the MongoDB URI.
5. Add env variables as "MONGO_URI" to the .env file
6. Add a PORT variable and JWT_SECRET variable too.
7. Set PORT = 4000
8. Set JWT_SECRET as a string of your choice.


## Steps to run the project

1. Open up the command terminal from the root directory and type `npm start` to start the backend server.

2. Open another command prompt and type the following to start the frontend.  
`cd client`
`npm i`
`npm run dev`

3. Open another command prompt and type the following to start the backend.  
`cd server`
`npm i`
`nodemon app`

4. The application would be run on http://127.0.0.1:5173/

4. The server would be run on http://127.0.0.1:4000/
   


## List of implemented features
* Register and Login User
* Each user gets a unique avatar
* Users can only register with NITK email id
* Different roles like Admin, Internship Coordinator, Placement Coordinator and User.
* List of categories with ability to add and delete category for the admin
* List of Users with their information
* Admin can change allowed categories for each user and handle their roles and status.
* Internship and Placement coordinators can edit the User status.
* User Dashboard where a user can see the categories he can write about and the gyans he has already wrote.
* List of Gyans
* Seperate page for each Gyan with an accordion
* Forms to add and edit gyans
* Pagination on the Gyan Page
* Filtering based on category and User branch

## List of planned features
* User authentication 
* Better and responsive UI
* More filtering options

## List of known bugs
* The pagination only lets the filter to apply on the current Gyans being rendered on the page.
* On deleting a category, a question or a user, the documents in which they were refered are not deleted. This renders them as null on populating from the database and breaks the application.
* On smaller screen, the UI breaks
* A user should be able to write a single gyan and each topic but he can write multiple of them.

## References
* Stack Overflow
* Tailwind CSS docs
* schdn ui
* W3School
* Jason Watmore's blog
* Mongoose JS docs
* Formik docs
* Medium articles

## Screenshots


Login And Register Form

![Login Form](./screenshots/1.png?raw=true "Login Form")

Chat Layout

![Chat Layout](./screenshots/2.png?raw=true "User List")

Search Contact

![Search Contact](./screenshots/3.png?raw=true "User Details (1)")

Update Profile

![Update Profile](./screenshots/4.png?raw=true "User Details (2)")








