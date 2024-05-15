const express = require("express");
const router = express.Router();
const ClienteController = require("../controllers/clienteController");

router.post("/", ClienteController.agregarClientes);
router.get("/", ClienteController.mostrarClientes);
router.get("/:id", ClienteController.mostrarUnCliente);
router.delete("/:id", ClienteController.eliminarClientes);
//router.patch("/:id", ClienteController.modificarCliente);
router.put("/:id", ClienteController.actualizarCliente);

module.exports = router;
