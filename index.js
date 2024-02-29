const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const EmployeeModel = require('./models/Employee')
const UserModel = require('./models/Users')

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL).then((res)=>{
    console.log("DB connection successful")
})

app.post("/login", (req,res) => {
    const {email,password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password == password) {
                res.json("Success")
            } else {
                res.json("The password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
})

app.post('/register', (req,res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.get('/', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id' , (req,res)=> {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post("/createUser",(req,res) =>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is Running")
})