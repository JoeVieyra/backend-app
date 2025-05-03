const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    rfc: { type: String, required: true, unique: true,uppercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);



module.exports = mongoose.model("User", userSchema);
