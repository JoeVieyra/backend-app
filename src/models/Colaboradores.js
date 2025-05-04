const mongoose = require("mongoose");

const ColaboradorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  rfc: { type: String, required: true },
  domicilioFiscal: { type: String, required: true },
  curp: { type: String, required: true },
  nss: { type: String, required: true },
  fechaInicioLaboral: { type: Date, required: true },
  tipoContrato: { type: String, required: true },
  departamento: { type: String, required: true },
  puesto: { type: String, required: true },
  salarioDiario: { type: Number, required: true },
  salario: { type: Number, required: true },
  claveEntidad: { type: String, required: true },
  estado: { type: String, required: true },
  eliminado: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Colaborador", ColaboradorSchema);
