//Require all dependencies
let express = require("express");
let app = express();
let mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
let cors = require("cors");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//Establishing database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database successfully!"))
  .catch(() => console.log("Failed to establish connection properly"));

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//handling invalid api
app.use((error, req, res, next) => {
  //console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message || error;
  res.status(statusCode).json({ message });
});

//ALL APIS
const ALL_ROUTES = require("../backend/api/utilites/all_routes");
app.use(ALL_ROUTES.auth);
app.use(ALL_ROUTES.userInfo);

//Listening to the port
app.listen(process.env.PORT, () => console.log("Connected to port 4000"));
