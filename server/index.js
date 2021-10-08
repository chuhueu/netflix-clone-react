const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const cors = require('cors');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies');
const listRoute = require('./routes/lists');
const packageRoute = require('./routes/package');
const transactionRoute = require('./routes/transaction');
const dotenv = require("dotenv");


dotenv.config();
app.use(bodyParser.json());
app.use(cors());
const URL = "mongodb+srv://testBoy:hieu123@cluster0.qhhal.mongodb.net/Netflix?retryWrites=true&w=majority";
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected....!"))
  .catch((err) => console.log({ message: err.message }));

// //MIDDLEWARE
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);
app.use("/api/package", packageRoute);
app.use("/api/transaction", transactionRoute);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING")
})

app.listen(process.env.PORT || 8080, () => {
  console.log("Backend server is running!");
});
