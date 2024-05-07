const express = require('express')
const router = express.Router()

const productosController = require('../controller/productosController')

//con filtros: temporada, 
router.get('/', productosController.obtenerTodas)
router.get('/nombre/:nombre', productosController.obtenerPorNombre)
router.get('/tipo/:tipo_producto', productosController.obtenerPorTipo)
router.get('/resumen', productosController.obtenerResumenCategoria)


router.post('/', productosController.agregarCamiseta)



module.exports = router