# Forex Trading Chat App Project

## Installation Steps:

1. Install nodejs and npm on your device.
2. Clone the repository to your local system.
3. In the root folder, create a '.env' file.
4. Create a MongoDB server and get the MongoDB URI.

## .env Requirement
* PORT = 4000
* MONGODB_URL_REMOTE = "YOUR_MongoDB URI"
* MY_SECRET= "YOUR_SECRECT"
* FRONTEND=http://localhost:5173
* STATUS="deployment"



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
* User Registration and Login: Users can register and log in to the chat application.
* Unique User Avatars: Each user is assigned a unique avatar to represent them in the chat.
* Email Registration Restriction: Users can only register using a valid NITK email ID.
* Role Management: Different user roles, including Admin, Internship Coordinator, Placement Coordinator, and User, each with specific permissions.
* Category Management: Admins can view, add, and delete categories for better organization of chat topics related to Forex trading.
* User Management: Admins can view a list of users along with their information and manage their roles and statuses.
* User Status Management: Internship and Placement Coordinators have the ability to edit the status of users.
* User Dashboard: Users can view their accessible categories and any important updates relevant to Forex trading.
* Real-Time Chat Functionality: Users can engage in real-time discussions about Forex trading strategies, market trends, and news.
* Filtering Options: Users can filter chat topics based on categories and specific trading interests for easier access to relevant conversations.

## List of planned features
* User authentication 
* Better and responsive UI
* More filtering options



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








