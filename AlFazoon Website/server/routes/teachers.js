import express from 'express'
import { getTeacher, getTeachersCount, getTeachers, updateTeacher, deleteTeacher, addTeacher } from './../controllers/teachers.js'

export const teachersRoute = express.Router()

teachersRoute.get('/teacher/:id', getTeacher)
teachersRoute.post('/teacher', addTeacher)
teachersRoute.get('/teachers', getTeachers)
teachersRoute.put('/teacher/:id',  updateTeacher)
teachersRoute.delete('/teacher/:id', deleteTeacher)

teachersRoute.get('/teachers/Count', getTeachersCount)

export default teachersRoute

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQ4NTljZGJiZjRiNmNlNGEzNjVjNTgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjU0NTUxNzUsImV4cCI6MTcyNTU0MTU3NX0.sIjnKBfG3q0_zwb72-Iv9v16Qw3i5UD65DNTlIS-SBo