require("dotenv").config();
const express = require("express");
const cors = require("cors");
require('./database');

//IMPORT Routers
const productosRouter = require('./routes/productosRouter')
const listaRouter = require('./routes/listaRouter')


const app = express()

const PORT = process.env.PORT || 4000
const IP = process.env.IP || '127.0.0.1'

app.use(express.json());

app.use(cors());

//Routing requests
app.use('/api/camisetas', productosRouter)


//Catches 404 not found errors
app.use((req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, process.env.IP, () => {
  console.log("listening", `${IP}:${PORT}/api`);
});