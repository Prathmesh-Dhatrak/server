const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

require("dotenv").config();
const { readdirSync } = require("fs");

// app
const app = express();

const cors = require("cors");
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connection Successfully done"))
  .catch((err) => console.log(`DB Connection Error ${err}`));

// middlewares

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes-middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

//port

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));
