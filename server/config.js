require('../db/config')
const express = require('express')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 8080

    this.middleware()
    this.routes()
  }

  middleware() {
    /* middlewares */
    this.app.use(express.json())
    /* archivos estaticos  */
    this.app.use(express.static(path.join(__dirname, '../public')))
    /* cors */
    this.app.use(cors())
    /* morgan */
    this.app.use(morgan('dev'))
  }

  routes() { 
    this.app.use('/api/productos', require('../routes/productos.routes'))
    this.app.use('/api/usuarios', require('../routes/usuarios.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('server ok ', this.port)
    })
  }
}

module.exports = Server