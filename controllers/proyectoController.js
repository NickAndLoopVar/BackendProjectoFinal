//Exportamos nuestro modelo
const Proyecto = require("../models/Proyecto");

//Crear una funcion: agregar proyectos

exports.agregarProyectos = async (req, res) => {
  try {
    let proyectos = new Proyecto(req.body);
    await proyectos.save();
    res.send(proyectos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al agregar un proyecto");
  }
};

//Mostrar proyectos

exports.mostrarProyectos = async (req, res) => {
  try {
    let proyectos = await Proyecto.find();
    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al mostrar los proyectos");
  }
};

//Mostrar un proyecto

exports.mostrarUnProyecto = async (req, res) => {
  try {
    let proyectos = await Proyecto.findById(req.params.id);
    if (!proyectos) {
      res.status(404).json({ msg: "No se encuentra un proyecto con ese ID" });
    }
    res.send(proyectos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al buscar el proyecto en la web");
  }
};

//Funcion para eliminar proyectos
exports.eliminarProyectos = async (req, res) => {
  try {
    let proyectos = await Proyecto.findById(req.params.id);
    if (!proyectos) {
      res.status(404).json({ msg: "El proyecto no existe" });
      return;
    }

    await Proyecto.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: "El proyecto fue eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al eliminar un proyecto en la BD");
  }
};

//Modificar proyectos

/*exports.modificarProyecto = async (req, res) => {
  try {
    let proyecto = await Proyecto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!proyecto) {
      return res.status(404).send("Proyecto no encontrado");
    }
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al modificar un proyecto");
  }
};
*/

exports.actualizarProyecto = async (req, res) => {
  try {
    const { nombre, framework, lenguaje, plataforma, duracion, precio } =
      req.body;
    let proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) {
      res.status(404).json({ msg: "El proyecto no existe" });
      return;
    }
    proyecto.nombre = nombre;
    proyecto.framework = framework;
    proyecto.lenguaje = lenguaje;
    proyecto.plataforma = plataforma;
    proyecto.duracion = duracion;
    proyecto.precio = precio;

    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      proyecto,
      {
        new: true,
      }
    );
    res.json(proyecto);
  } catch (error) {
    res.status(500).send("hubo un error al actualizar un proyecto");
  }
};
