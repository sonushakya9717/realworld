const express = require("express");
const app = express();
const session = require("express-session")
require("dotenv").config();


app.use(express.json());
app.use(session({
    secret:"realworld123",
    resave:false,
    saveUninitialized:false
}));

const user = require("./routes/user");

app.use("/", user);


app.use((err, req, res, next) => {
    // console.log(err);
    return res.status(err.status).json(err);
  });
  
  const PORT = process.env.PORT || 3002;


app.listen(PORT, () => console.log("app is listening on port", PORT));

