const mongoose = require("mongoose");
const { mongoConnector } = require("../mongo/mongoConnector");

const NewsSchema = new mongoose.Schema({
  information_id: { type: String },
  data_id: { type: String, default: "" },
  type: { type: String, default: "0" },
  country: { type: String, default: "" },
  content: { type: String },
  add_time: { type: Date },
  important: { type: Number, default: 0 },
  star: { type: String, default: "0" },
  actual: { type: String, default: "null" },
  previous: { type: String, default: "null" },
  consensus: { type: String, default: "null" },
  revised: { type: String, default: "null" },
  time: { type: String },
  translate: { type: String },
  pub_time: { type: String },
  is_pub: { type: Number, default: 0 },
  id: { type: Number },
  is_link: { type: Number, default: 0 },
  article_id: { type: String, default: "" },
  unit: { type: String, default: "" },
});

const NewsModel = mongoConnector.db.model("News", NewsSchema);
module.exports = NewsModel;
