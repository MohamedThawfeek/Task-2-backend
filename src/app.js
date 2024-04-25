const express = require("express");
const { db } = require('./Database')
const cors = require('cors');

const router = require('./router/routes')

const PORT = process.env.PORT || 5000

const app = express()

db()

app.use(cors());

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use("/", router);



app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}!`)
})