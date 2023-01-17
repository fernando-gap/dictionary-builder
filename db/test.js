//const userSchema = new Schema({
    //username: { type: String, required: true  },
    //password: { type: String, required: true  },
    //age: { type: Date, required: true  }
//})

const { User } = require('./db.config.js');

const user = new User({
  username: 'admin',
  password: 'admin',
  age: Date()
})

user.save(function(err) {
  if (err) {
    console.log(err)
    throw err
  }
  console.log('Saved!')
})
