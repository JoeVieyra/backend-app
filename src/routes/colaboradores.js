const express = require("express");
const router = express.Router();
const controller = require("../controllers/colaboradorController");

router.post("/", controller.crearColaborador);
router.get("/", controller.obtenerColaboradores);
router.get("/buscar", controller.buscarColaboradores);
router.put("/:id", controller.editarColaborador);
router.delete("/:id", controller.eliminarColaborador);

module.exports = router;
