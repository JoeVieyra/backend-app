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
  ruta: {
    type: String,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  creadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("File", FileSchema);
