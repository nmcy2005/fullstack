const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

//Body parser Middleware

app.use(bodyParser.json());

//DB
const db = require("./config/keys").mongoURI;

//Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected"))
  .catch((err) => console.log("error"));

//use Routes
app.use("/api/items", items);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //SET static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server started on " + port));
