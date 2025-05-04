const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");

// Validar RFC (estructura básica)
const validarRFC = (rfc) => /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/.test(rfc);

// Registro
router.post("/register", async (req, res) => {
  const { nombre, email, rfc, password } = req.body;

  if (!nombre || !email || !rfc || !password)
    return res.status(400).json({ message: "Campos requeridos" });

  if (!validarRFC(rfc))
    return res.status(400).json({ message: "RFC inválido" });

  const emailExist = await User.findOne({ email });
  if (emailExist)
    return res.status(400).json({ message: "Email ya registrado" });

  const rfcExist = await User.findOne({ rfc });
  if (rfcExist) return res.status(400).json({ message: "RFC ya registrado" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ nombre, email, rfc, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: "Usuario registrado" });
});

// Login
router.post("/login", async (req, res) => {
  const { nombre, rfc, email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Credenciales inválidas" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ message: "Credenciales inválidas" });

  res.json({ nombre:user.nombre, email:user.email, rfc:user.rfc,  message: "Login exitoso", userId: user._id });
});

// Cambio de contraseña
router.post("/change-password", async (req, res) => {
  const { email, rfc, newPassword } = req.body;

  const user = await User.findOne({ email, rfc });
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();

  res.json({ message: "Contraseña actualizada" });
});

module.exports = router;
