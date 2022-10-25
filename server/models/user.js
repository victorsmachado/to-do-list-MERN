const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    nome: {type:String, required:true},

    email: {
        type:String, required:true
    },

    senha: {
        type:String, required:true
    },

    dataDeNascimento: {
        type:String, required:true
    },

    endereco: {
        type:String, required:true
    }
})

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, 'eyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5c ', {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        nome:Joi.string().required().label('Nome'),
        email:Joi.string().email().required().label('Email'),
        senha: passwordComplexity().required().label('Senha'),
        dataDeNascimento:Joi.string().required().label('Name'),
        endereco:Joi.string().required().label('Name')
    })
    return schema.validate(data)
}

module.exports = {User, validate}