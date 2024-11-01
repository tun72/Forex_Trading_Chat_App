const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//dot env config
const dotenv = require("dotenv");
dotenv.config();

//socket
const setupSocket = require("./socket");

//Controllers
const ErrorController = require("./controllers/ErrorController");

//Routers
const AuthRoute = require("./routes/AuthRoute");
const UserRoute = require("./routes/UserRoute");
const ContactRoute = require("./routes/ContactRoute");
const MessageRoute = require("./routes/MessageRoute");
const ChannelRoute = require("./routes/ChannelRoute");

//express
const app = express();

//cors
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
);

//body parser and public access
app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ limit: "100mb" }));

//additional middleware
app.use(cookieParser());

app.use(morgan("dev"));

//routes
app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/contact", ContactRoute);
app.use("/api/message", MessageRoute);
app.use("/api/channel", ChannelRoute);

// for 404 routes
app.all("*", (req, res) => {
  return res.status(404).json({ message: "404 Not Found!" });
});

// to handel errors
app.use(ErrorController);
const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGODB_URL_REMOTE)
  .then((_) => {
    console.log("database successfully connected ✅");
    const server = app.listen(PORT, () => {
      console.log("Server is running at http://localhost:" + PORT);
    });

    setupSocket(server);
  })
  .catch((error) => console.log(error));
