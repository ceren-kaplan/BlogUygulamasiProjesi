const { model, Schema } = require("mongoose");

const MakaleSchema = new Schema({
  baslik: String,
  icerik: String,
});

module.exports = new model("Makale", MakaleSchema);
