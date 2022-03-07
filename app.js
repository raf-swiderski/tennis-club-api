const express = require('express')
const app = express()
const port = 3000
// app.use(express.static('static'))

app.get('/', (req, res) => { 
    res.send('tennis')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
