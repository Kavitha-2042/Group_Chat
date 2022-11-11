import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoute from './Route/userRoute';
import cors from 'cors'
import messageRoute from './Route/messagesRoute';

const app:express.Application = express()

app.use(cors({
    credentials:true,
    origin:process.env.REACT_URL,
    methods:["GET", "POST"]
}))

app.use('/Public', express.static('Public'))

app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/user', userRoute)
app.use('/message', messageRoute)

mongoose.connect(process.env.MONGOOSE_URL as string, ()=>{
    console.log("Db connected")
    app.listen(process.env.PORT_NUMBER as string, ()=>{
        console.log(`Server runs on port ${process.env.PORT_NUMBER}`)
    })
})