const express = require('express')
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'))

app.route('/register')
  .get((req, res) => {
    res.sendFile('static/register.html', {root: __dirname })
  })
  .post((req, res) => {
      console.log(req.body)
  })

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
