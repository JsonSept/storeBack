import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import mysql2 from 'mysql2'
import {config} from 'dotenv'
import productsRouter from '../backend/routes/products.js'
import usersRouter from '../backend/routes/users.js'
import cartRouter from '../backend/routes/cart.js'


import {auth} from './middleware/authenticate.js'

config()

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/cart', cartRouter)

app.get('users', (req,res)=>{
    res.json(users)
})

app.post('/users', async (req,res)=>{
    try {
       
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const user =  {email: req.body.email , password: req.body.password}
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }

})

app.post('/users/login', async (req,res)=>{
    const user = users.find(users.email = req.body.email)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    } try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('success')
        }else {
            res.send('Not Allowed!')
        }
    }catch {
    res.status(500).send()
    }
})

app.listen(PORT, ()=>{
    console.log('http://localhost:'+ PORT);
})