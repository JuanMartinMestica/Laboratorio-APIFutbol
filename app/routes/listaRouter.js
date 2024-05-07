const express = require('express')
const router = express.Router()

const listaController = require('../controller/listaController')

router.get('/', listaController.obtenerListas)
router.get('/:nombre', listaController.obtenerLista)

router.post('/', listaController.agregarLista)



module.exports = router