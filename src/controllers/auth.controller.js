const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { nombre, email, rfc, password, confirmPassword } = req.body;

  if (!nombre || !email || !rfc || !password || !confirmPassword)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Las contraseñas no coinciden" });

  const rfcRegex = /^([A-ZÑ&]{3,4})\d{6}([A-Z\d]{3})?$/;
  if (!rfcRegex.test(rfc))
    return res.status(400).json({ message: "RFC inválido" });

  const correoExistente = await User.findOne({ email });
  const rfcExistente = await User.findOne({ rfc });
  if (correoExistente || rfcExistente)
    return res.status(400).json({ message: "Correo o RFC ya registrados" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const nuevoUsuario = new User({
    nombre,
    email,
    rfc,
    password: hashedPassword,
  });
  await nuevoUsuario.save();

  res.status(201).json({ message: "Usuario registrado correctamente" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  const usuario = await User.findOne({ email });
  if (!usuario)
    return res.status(404).json({ message: "Usuario no encontrado" });

  const passwordCorrecto = await bcrypt.compare(password, usuario.password);
  if (!passwordCorrecto)
    return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    token,
    usuario: {
      nombre: usuario.nombre,
      email: usuario.email,
      rfc: usuario.rfc,
    },
  });
};
