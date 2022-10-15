const { Router } = require('express')
const routerPrefijo = Router()

routerPrefijo.get('/prefijos', (req, res) => {
    res.json(require('./countryCodes.json'))
})

module.exports = routerPrefijo;