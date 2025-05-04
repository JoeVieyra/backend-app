const Colaborador = require("../models/Colaboradores");

// Crear colaborador
exports.crearColaborador = async (req, res) => {
  try {
    const colaborador = new Colaborador(req.body);
    await colaborador.save();
    res.status(201).json(colaborador);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los colaboradores (no eliminados)
exports.obtenerColaboradores = async (req, res) => {
  try {
    const colaboradores = await Colaborador.find({ eliminado: false });
    res.json(colaboradores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar colaborador por parámetros
exports.buscarColaboradores = async (req, res) => {
  const { curp, rfc, nombre, fechaInicioLaboral } = req.query;
  const filtro = { eliminado: false };

  if (curp) filtro.curp = curp;
  if (rfc) filtro.rfc = rfc;
  if (nombre) filtro.nombre = new RegExp(nombre, "i");
  if (fechaInicioLaboral)
    filtro.fechaInicioLaboral = new Date(fechaInicioLaboral);

  try {
    const resultados = await Colaborador.find(filtro);
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar colaborador
exports.editarColaborador = async (req, res) => {
  try {
    const actualizado = await Colaborador.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar (lógico) colaborador
exports.eliminarColaborador = async (req, res) => {
  try {
    await Colaborador.findByIdAndUpdate(req.params.id, { eliminado: true });
    res.json({ mensaje: "Colaborador eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
