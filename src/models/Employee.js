const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  rfc: {
    type: String,
    required: true,
    unique: true,
  },
  domicilioFiscal: {
    type: String,
    required: true,
  },
  curp: {
    type: String,
    required: true,
    unique: true,
  },
  numeroSeguridadSocial: {
    type: String,
    required: true,
  },
  fechaInicioLaboral: {
    type: Date,
    required: true,
  },
  tipoContrato: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
    required: true,
  },
  puesto: {
    type: String,
    required: true,
  },
  salarioDiario: {
    type: Number,
    required: true,
  },
  salario: {
    type: Number,
    required: true,
  },
  claveEntidad: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  activo: {
    type: Boolean,
    default: true,
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

module.exports = mongoose.model("Employee", EmployeeSchema);
