require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const authRoutes = require("./routes/auth");
const caseRoutes = require("./routes/cases");
const userRoutes = require("./routes/users");
const path = require('path');

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/users", userRoutes);

// production script
app.use(express.static("./client/build"));
app.length("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
