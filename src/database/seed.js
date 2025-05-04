const mongoose = require("mongoose");
const Colaborador = require("./models/Colaborador");

mongoose
  .connect("mongodb://localhost:27017/appUsuarios")
  .then(async () => {
    const colaboradores = require("../database/colaboradors.json");
    await Colaborador.insertMany(colaboradores);
    console.log("Datos insertados");
    process.exit();
  })
  .catch((err) => console.error(err));
