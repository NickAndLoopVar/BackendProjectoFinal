const express = require("express");
const router = express.Router();
const ProyectoController = require("../controllers/proyectoController");

router.post("/", ProyectoController.agregarProyectos);
router.get("/", ProyectoController.mostrarProyectos);
router.get("/:id", ProyectoController.mostrarUnProyecto);
router.delete("/:id", ProyectoController.eliminarProyectos);
//router.patch("/:id", ProyectoController.modificarProyecto);
router.put("/:id", ProyectoController.actualizarProyecto);

module.exports = router;
