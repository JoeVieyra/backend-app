const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
 
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
 
});

module.exports = mongoose.model("File", FileSchema);
