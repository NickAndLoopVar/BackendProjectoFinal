const mongoose = require("mongoose");

const proyectoSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    framework: {
      type: String,
      required: true,
    },
    lenguaje: {
      type: String,
      required: true,
    },
    plataforma: {
      type: String,
      required: true,
    },
    duracion: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
  },
  { versionkey: false }
);

module.exports = mongoose.model("Proyecto", proyectoSchema);
