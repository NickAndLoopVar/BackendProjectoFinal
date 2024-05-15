const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  //revisar si tenemos errores

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const { email, password } = req.body;
  try {
    //Se verifica que el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }
    //Crear el nuevo usuario
    usuario = new Usuario(req.body);
    usuario.password = await bcryptjs.hash(password, 8);
    //Guardamos el usuario
    await usuario.save();
    // Si todo OK, se firma el token
    const payload = {
      usuario: { id: usuario.id },
    };
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, //1 hora
      },
      (error, token) => {
        if (error) throw error;
        //Mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log("Hay un error");
    console.log(error);
    res.status(400).send("Hay un error");
  }
};
