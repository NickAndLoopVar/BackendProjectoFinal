const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const usuariosController = require("../controllers/usuariosController");

//Creamos un usuario -- api/usuarios

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Agrege un email valido").isEmail(),
    check("password", "El pasword debe contener minimo 8 caracteres").isLength({
      min: 8,
    }),
  ],
  usuariosController.crearUsuario
);
module.exports = router;
