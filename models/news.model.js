const mongoose = require("mongoose");
const { mongoConnector } = require("../mongo/mongoConnector");

const NewsSchema = new mongoose.Schema({
  information_id: { type: String, required: true },
  data_id: { type: String, default: "" },
  type: { type: String, default: "0" },
  country: { type: String, default: "" },
  content: { type: String, required: true },
  add_time: { type: Date, required: true },
  important: { type: Number, default: 0 },
  star: { type: String, default: "0" },
  actual: { type: String, default: "null" },
  previous: { type: String, default: "null" },
  consensus: { type: String, default: "null" },
  revised: { type: String, default: "null" },
  time: { type: String, required: true },
  translate: { type: String, required: true },
  pub_time: { type: String, required: true },
  is_pub: { type: Number, default: 0 },
  id: { type: Number, required: true },
  is_link: { type: Number, default: 0 },
  article_id: { type: String, default: "" },
  unit: { type: String, default: "" },
});

const NewsModel = mongoConnector.db.model("News", NewsSchema);
module.exports = NewsModel;
