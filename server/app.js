const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./routes");

const app = express();


app.use(cors());
app.use(express.json());

app.use("/todos",router);

mongoose.connect("mongodb://localhost/todo_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3001, () => {
  console.log("App Listening port 3001");
});
