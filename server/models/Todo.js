const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: false,
  },
});

const TodoSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  list: {
    type: [itemSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("todo", TodoSchema);
