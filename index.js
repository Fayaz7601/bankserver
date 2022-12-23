// import dataservice file from service folder
const dataservice = require('./services/dataservice')

// import jsonwebtoken

const jwt = require('jsonwebtoken')

// server creation

// 1.import express
// import and store it in a variable
const express = require('express')


// 2.creating an application using express

const app = express()

// to convert json items.....type conversion for entire project
app.use(express.json())

// 3.create port number(for backend)

app.listen(3000, () => {
    console.log('listening on port 3000');
})

// middleware for varifying the token

const jwtmiddleware = (req, res, next) => {
    console.log("router speific middleware");
    try {
        const token = req.headers['access-token']
        const data = jwt.verify(token, "secretkey123")
        console.log(data);
        next()
    }
    catch{
        res.status(422).json({
        statusCode:422,
        status:false,
        message:"please login"
        })
 }
}

// 4.resolving http request
//    get http request

// app.get('/', (req, res) => {
//     res.send('get http request')
// })

// app.post('/', (req, res) => {
//     res.send('post request')
// })

// app.patch('/',(req,res)=>{
//     res.send('get http request')
// })

// app.delete('/',(req,res)=>{
//     res.send('get http request')
// })


// API CALLS

// registration request
app.post('/register', (req, res) => {
    const result = dataservice.register(req.body.acno, req.body.username, req.body.password)
    res.status(result.statusCode).json(result)

})



// login request
app.post('/login', (req, res) => {
    const result = dataservice.login(req.body.acno, req.body.psw)
    res.status(result.statusCode).json(result)
})


// deposit request
app.post('/deposit', jwtmiddleware, (req, res) => {
    const result = dataservice.deposit(req.body.acno, req.body.psw, req.body.amt)
    res.status(result.statusCode).json(result)
})



// withdraw request
app.post('/withdraw',jwtmiddleware, (req, res) => {
    const result = dataservice.withdraw(req.body.acno1, req.body.psw1, req.body.amt1)
    res.status(result.statusCode).json(result)
})


// transaction history request
app.post('/transaction',jwtmiddleware, (req, res) => {
    const result = dataservice.gettransaction(req.body.acno)
    res.status(result.statusCode).json(result)
})

// delete request
