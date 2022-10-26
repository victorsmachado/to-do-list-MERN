const router = require("express").Router();
const {User, validate} = require("../models/user")
const bcrypt = require("bcrypt");

router.post('/', async(req, res) => {
    try{
        const{error} = validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message})
        
        
        const user = await User.findOne({email: req.body.email})
        if(user)
            return res.status(409).send({message:"Já existe usuário com esse email!"})
    
        const salt = await bcrypt.genSalt(Number('10'));
        const hashSenha = await bcrypt.hash(req.body.senha, salt);
        
        await new User({...req.body, senha:hashSenha}).save();
        res.status(201).send({message: "Usuário criado com sucesso!"})
    } catch(error){
        res.status(500).send({message:"Erro interno"})

    }
});

router.put("/:id", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        res.status(200).json({user})
    } catch (error) {
        res.status(500).send({message:"Erro interno"})
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({user})
    } catch (error) {
        res.status(500).send({message:"Erro interno"})
    }
});

router.get('/:id', checkToken, async(req, res) => {
    try{
        const id = req.params.id
        const user = await User.findById(id, '-senha')
        if(!user) {
            return res.status(404).send({message:"Usuário não encontrado"})
        }

        res.status(200).json({user})

    } catch(error){
        res.status(500).send({message:"Erro interno"})

    }
});

function checkToken(req,res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1]
    console.log(token);

    if(!token){
        return res.status(401).send({message:"Acesso negado!"})
    }

    try {
        const secret = 'eyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5c'
        console.log(secret);
        console.log(token);
        if(token == secret)
            return next()
    } catch (error) {
        res.status(400).send({message:"Token inválido!"})
    }
};



module.exports = router;