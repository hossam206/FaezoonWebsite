import express from 'express'
import { login } from './../controllers/teachers.js'

const loginRoute = express.Router()



loginRoute.post('/login', login)

export default loginRoute