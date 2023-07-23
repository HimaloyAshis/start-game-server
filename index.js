const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')


app.use(cors())
app.use(express.json())


app.get('/', (req, res)=>{
    res.send('game start is live now')
})

app.get(port, ()=>{
    app.listen(`Game start is in the back-end`)
})