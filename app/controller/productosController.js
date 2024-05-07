const productosServices = require("../services/productosServices");

const obtenerTodas = async (req, res) => {

  const params = req.query;

  const camisetas = await productosServices.obtenerTodas(params);

  res.send(camisetas);

};


const obtenerPorNombre = async (req, res) => {
  try {
        
    const nombre = req.params.nombre;

    const camisetas = await productosServices.obtenerCamisetas(nombre);

    res.send(camisetas);


  } catch (err) {
    
    console.log(err);
    res.send({
      camisetas: [],
      message: "No se pudo obtener los productos por nombre",
    });
  
  }
};

const obtenerPorTipo = async (req, res) => {
  try {


    const tipo_producto = req.params.tipo_producto;

    const camisetas = await productosServices.obtenerTipo(tipo_producto);

    res.send(camisetas);


  } catch (error) {


    console.log(err);
    res.send({
      camisetas: [],
      message: "No se pudo obtener los productos por tipo",
    });


  }
};

const agregarCamiseta = async (req, res) => {

  try {
    const nuevaCamiseta = req.body;

    const insert = await productosServices.agregarCamiseta(nuevaCamiseta);

    if (insert) {
      res.send({ success: true, message: "Se agregó con éxito el producto" });
    } else {
      res.send({ success: false, message: "No se agregó el producto" });
    }


  } catch (err) {

    console.log(err);
    res.send({
      success: false,
      message: "Ocurrió un error, no se pudo agregar el producto",
    });

  }
};

const obtenerResumenCategoria = async (req, res) => {
  try {
    
      const resumen = await productosServices.obtenerResumen()

      res.send(resumen)



  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Ocurrió un error, no se pudo obtener el resumen."
    })
  }
};

module.exports = {
  obtenerTodas,
  obtenerPorNombre,
  obtenerPorTipo,
  agregarCamiseta,
  obtenerResumenCategoria,
};
