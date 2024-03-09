import express from "express"
import bootstarp from './src/bootstrap.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = +process.env.PORT
bootstarp(app , express)

app.listen(port , () => {
    console.log(`server runing now ${port}`)
})