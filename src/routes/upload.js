const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Archivo = require("../models/File"); // importa el modelo

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".pdf", ".xlsx"];
    const allowedMimeTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/octet-stream",
    ];

    const ext = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (
      allowedExtensions.includes(ext) &&
      allowedMimeTypes.includes(mimetype)
    ) {
      return cb(null, true);
    } else {
      console.error(`Tipo no permitido: ext=${ext}, mimetype=${mimetype}`);
      return cb(new Error("Solo se permiten archivos PDF y XLSX"));
    }
  },
});

// Subida de archivo
router.post("/upload", upload.single("archivo"), async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "No se subió archivo" });

  try {
    const nuevoArchivo = new Archivo({
      nombre: req.file.originalname,
      extension: path.extname(req.file.originalname).replace(".", ""),
    });

    await nuevoArchivo.save();

    res.status(201).json({
      message: "Archivo subido",
      nombre: nuevoArchivo.nombre,
      extension: nuevoArchivo.extension,
      fecha: nuevoArchivo.fecha,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al guardar en la base de datos" });
  }
});

// Obtener archivos guardados
router.get("/", async (req, res) => {
  try {
    const archivos = await Archivo.find().sort({ fecha: -1 });
    res.json(archivos);
  } catch (error) {
    console.error("Error al guardar en DB:", error);
    res.status(500).json({ message: "Error al obtener archivos" });
  }
});

module.exports = router;
