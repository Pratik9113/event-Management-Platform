const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({   
    name: {
        type: String,
        required: true
    },  
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        
    }
})


const LoginModel =  mongoose.models.login ||  mongoose.model('login', loginSchema);

module.exports = LoginModel;
