const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const config = require("dotenv").config().parsed;

// Bodyparser Middleware
app.use(express.json());
const { mongo_uri } = require("./config");
// Connect to Mongo
mongoose
  .connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  console.log("Serving in production");
  // Set static folder
  app.use(express.static("client/build"));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  console.log("Serving in development");
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Service started on port: ${port}`));
