import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(compression())
app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})