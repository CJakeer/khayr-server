const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");

const schema = require("./src/graphql/graphql.schema");

const app = express();

//static pages
app.use(express.static("public/HTML"));

//cors middleware
app.use(cors());

//mongoDB connection
const MongoDB =
  process.env.ATLAS_MONGODB_URL ||
  "mongodb+srv://forExpressApi:atlasFirst@cluster0-b7wvd.mongodb.net/khayr?retryWrites=true&w=majority";
mongoose.connect(
  MongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log(MongoDB)
);

//graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

//run server
const Port = process.env.PORT || 7000;
app.listen(Port, () => {
  console.log("server running at port: ", Port);
});
