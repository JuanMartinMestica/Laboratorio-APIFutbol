const db = require("../database");

const obtenerTodas = async (params) => {
  //Consulta básica
  let baseQuery = "SELECT * FROM producto";
  const condiciones = [];

    // Obtenemos filtros de paginación
    const { limit, page } = params;

    //Eliminamos para no usarlos como filtros en la consulta
    delete params.limit;
    delete params.page;
  
    //Obtenemos todos los filtros menos page y limit que son para paginación
    const filtros = Object.keys(params).filter(filtro => filtro !== 'page' && filtro !== 'limit');
    const valoresFiltros = Object.values(params);

  // Se agregan los filtros en caso de que existan
  if (filtros.length > 0) {

    baseQuery += " WHERE "

    filtros.forEach((filtro, index) => {

        let query;

        /*Si el filtro es nombre se agrega un ILIKE para 
        buscar por expresión regular y no por coincidencia 
        total*/

        if (filtro === "nombre") {

            query = `${filtro} ILIKE $${index+1}`
            valoresFiltros[index] = valoresFiltros[index] + "%"

        } 
        
        /* En cualquier otro caso, se agrega FILTRO = VALOR */
        else {

        query = `${filtro} = $${index+1}` }

        condiciones.push(query)

        
    });

    // Unimos todas las condiciones con 'AND'
    baseQuery += condiciones.join(" AND ");
  }
  
  // Si tiene paginación
  if (limit && page) {

    const offset = (page - 1) * limit;
    baseQuery += ` LIMIT $${condiciones.length + 1} OFFSET $${condiciones.length + 2}`;
    valoresFiltros.push(limit, offset);

  }

  const results = await db.query(baseQuery, valoresFiltros);

  return results.rows;
};

const obtenerCamisetas = async (nombre) => {
  const results = await db.query(
    "SELECT * FROM producto WHERE nombre ILIKE $1",
    [nombre + "%"]
  );

  return results.rows;
};

const obtenerTipo = async (tipo) => {
  const results = await db.query("SELECT * FROM producto WHERE tipo = $1", [
    tipo,
  ]);

  return results.rows;
};

const agregarCamiseta = async (nuevaCamiseta) => {
  const values = [
    nuevaCamiseta.nombre,
    nuevaCamiseta.temporada,
    nuevaCamiseta.link_foto,
    nuevaCamiseta.continente,
    nuevaCamiseta.equipo,
    nuevaCamiseta.liga,
    nuevaCamiseta.tipo,
  ];

  const insert = await db.query(
    "INSERT INTO producto(nombre, temporada, link_foto, continente, equipo, liga, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    values
  );

  return insert.rowCount > 0;
};


const obtenerResumen = async () => {

  const result = await db.query("SELECT continente, COUNT(*) as cantidad FROM producto GROUP BY continente")

  const resultTotal = await db.query("SELECT COUNT(*) as cantidad  FROM producto");

  resultTotal.rows[0].continente = "Total"

  result.rows.push(resultTotal.rows[0]);

  return result.rows

}



module.exports = {
  obtenerTodas,
  obtenerTipo,
  obtenerCamisetas,
  agregarCamiseta,
  obtenerResumen
};
