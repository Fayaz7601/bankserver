// iimport db.js
const db=require("./db")

// import jsonwebtoken

const jwt=require('jsonwebtoken')


userdetails = {
  1000: { acno: 1000, username: "amal", password: 123, balance: 0, transaction: [] },
  1001: { acno: 1001, username: "anu", password: 123, balance: 0, transaction: [] },
  1002: { acno: 1002, username: "arun", password: 123, balance: 0, transaction: [] },
  1003: { acno: 1003, username: "mega", password: 123, balance: 0, transaction: [] }
}

register = (acno, username, password) => {
return db.User.findOne({acno}).then(user=>{
  if(user){
    return {
      statusCode: 401,
      status: false,
      message: 'user already exists'
    }

  }
  else{
    const newuser=new db.User({
      acno,
      username,
       password,
        balance:0,
         transaction: []
    })

    newuser.save()
    return {
      statusCode: 200,
      status: true,
      message: 'registration successsfull'
    }
  }
})

  //  in server every function must be arrow function
  if (acno in userdetails) {
    return {
      statusCode: 401,
      status: false,
      message: 'user already exists'
    }

  }

  else {
    userdetails[acno] = { acno, username, password, balance: 0, transaction: [] }
    console.log(userdetails);
    return {
      statusCode: 200,
      status: true,
      message: 'registration successsfull'
    }
  }
}


login = (acno, psw) => {
  
  if (acno in userdetails) {
    if (psw == userdetails[acno]["password"]) {
       // generating token
       const token=jwt.sign({currentacno:acno},'secretkey123')
      return {

        statusCode: 200,
        status: true,
        message: "login successsfull",
        token
      }

    }
    else {
      return {

        statusCode: 401,
        status: false,
        message: "password incorrect"
      }

    }
  }
  else {
    return {

      statusCode: 401,
      status: false,
      message: "invalid acno"
    }
  }

}

deposit = (acno, psw, amt) => {

  var amount = parseInt(amt)
  if (acno in userdetails) {
    if (psw == userdetails[acno]['password']) {
      userdetails[acno]['balance'] += amount

      userdetails[acno]['transaction'].push({ type: 'CREDIT', amount })
      return {
        statusCode: 200,
        status: true,
        message: userdetails[acno]['balance']
      }
    }

    else {
      return {
        statusCode: 401,
        status: false,
        message: 'incorrect password'
      }
    }
  }
  else {
    return {
      statusCode: 400,
      status: false,
      message: 'invalid acno'
    }
  }
}

withdraw = (acno1, psw1, amt1) => {
  var amount = parseInt(amt1)
  if (acno1 in userdetails) {
    if (psw1 == userdetails[acno1]['password']) {
      if (amount <= userdetails[acno1]['balance']) {
        userdetails[acno1]['balance'] -= amount

        userdetails[acno1]['transaction'].push({ type: 'DEBIT', amount })
        return {
          statusCode: 200,
          status: true,
          message: userdetails[acno1]['balance']
        }
      }
      else {
        return {
          statusCode: 401,
          status: false,
          message: 'insufficient balace'
        }
      }

    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: 'invalid password'
      }
    }

  }
  else {
    return {
      statusCode: 401,
      status: false,
      message: 'invalid acno'
    }
  }
}

gettransaction = (acno) => {
  if (acno in userdetails) {
    return {
      statusCode: 200,
      status: true,
      message: userdetails[acno]['transaction']
    }
  }
  else {

    return {
      statusCode: 401,
      status: false,
      message: "incorrect pass"
    }
  }
}
module.exports = {
  register,
  login,
  deposit,
  withdraw,
  gettransaction
}
