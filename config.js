const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  node_env: process.env.NODE_ENV,
  mongo_uri: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@smartmirror-s2k7q.gcp.mongodb.net/shoppinglist?retryWrites=true&w=majority`
};
