const express = require("express");
const ConectarBD = require("./config/db");
const cors = require("cors");

//Creamos el servidor
const app = express();
//Configuramos el puerto en una variable
const PORT = process.env.PORT || 7000;
//Conectar base de datos
ConectarBD();
//Habilitar cors
app.use(cors());
//Habilitar express json
app.use(express.json({ extended: true }));
//Creamos las rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/clientes", require("./routes/clientes"));
app.use("/api/proyectos", require("./routes/proyectos"));

//Configuracion del servidor

app.listen(PORT, () => {
  console.log("El servidor esta conectado");
});
