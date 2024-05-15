//Exportamos nuestro modelo
const Cliente = require("../models/Cliente");

//Crear una funcion: agregar clientes

exports.agregarClientes = async (req, res) => {
  try {
    let clientes = new Cliente(req.body);
    await clientes.save();
    res.send(clientes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al agregar un cliente");
  }
};

//Mostrar clientes

exports.mostrarClientes = async (req, res) => {
  try {
    let clientes = await Cliente.find();
    res.json({ clientes });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al mostrar los clientes");
  }
};

//Mostrar un cliente

exports.mostrarUnCliente = async (req, res) => {
  try {
    let clientes = await Cliente.findById(req.params.id);
    if (!clientes) {
      res.status(404).json({ msg: "No se encuentra el cliente con ese ID" });
    }
    res.send(clientes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al buscar el cliente en la web");
  }
};

//Funcion para eliminar clientes
exports.eliminarClientes = async (req, res) => {
  try {
    let clientes = await Cliente.findById(req.params.id);
    if (!clientes) {
      res.status(404).json({ msg: "El cliente no existe" });
      return;
    }

    await Cliente.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: "El cliente fue eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al eliminar un cliente en la BD");
  }
};

//Modificar clientes

/*exports.modificarCliente = async (req, res) => {
  try {
    let cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cliente) {
      return res.status(404).send("Cliente no encontrado");
    }
    res.json(cliente);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al modificar un cliente");
  }
};
*/
exports.actualizarCliente = async (req, res) => {
  try {
    const { nombres, apellidos, documento, correo, telefono, direccion } =
      req.body;
    let cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      res.status(404).json({ msg: "El cliente no existe" });
      return;
    }
    cliente.nombres = nombres;
    cliente.apellidos = apellidos;
    cliente.documento = documento;
    cliente.correo = correo;
    cliente.telefono = telefono;
    cliente.direccion = direccion;

    cliente = await Cliente.findByIdAndUpdate({ _id: req.params.id }, cliente, {
      new: true,
    });
    res.json(cliente);
  } catch (error) {
    res.status(500).send("Hubo un error al actualizar un cliente");
  }
};
