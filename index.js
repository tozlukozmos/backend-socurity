const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const dbConnection = require("./v1/src/loaders/Database");
const UserRoutes = require("./v1/src/routes/User");
const PostRoutes = require("./v1/src/routes/Post");
const NotificationRoutes = require("./v1/src/routes/Notification");
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://192.168.2.112:3000', 'https://socurity.netlify.app'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600,
    preflightContinue: false
}));
dbConnection();

app.use("/users", UserRoutes);
app.use("/posts", PostRoutes);
app.use("/notifications", NotificationRoutes);

app.use((req, res, next) => {
    res.status(404).send({error: "404 Not Found"})
    next();
})

const PORT = process.env.PORT || 2021;

app.listen(PORT, () => {console.log("server is running on 2021");})