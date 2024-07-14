const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://<username>:<password>@cluster0.tbdb9lh.mongodb.net/")
  .then(() => console.log("connected to the mongodb"))
  .catch((e) => console.log(e));
