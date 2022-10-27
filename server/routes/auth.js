const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

//Definição dos controladores da autorização do usuário para o login

//Rota de login post
router.post("/", async (req, res) => {
  try {
    //Validação dos dados de entrada
    const { error } = validate(req.body);
    if (error)
      //Se não cumpre os requisitos retorna um erro 400 com a mensagem de erro
      return res.status(400).send({ message: error.details[0].message });

    //Tenta encontrar o usuario pelo email enviado na requisição
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      //Se não encontrar retorna um erro 401 com a mensagem de erro
      return res.status(401).send({ message: "Invalid Email or Password" });

    //Compara a senha enviada com a senha do usuario encontrado no banco com criptografia do bcrypt
    const validPassword = await bcrypt.compare(req.body.senha, user.senha);

    if (!validPassword)
      //Se a senha não foi valida retorna um erro 401 com a mensagem de erro
      return res.status(401).send({ message: "Invalid Email or Password" });

    //Se a senha foi valida retorna um token de acesso
    const token = user.generateAuthToken();

    //Gera um data que será enviado como resposta
    const data = {
      token: token,
      usuario: user.nome,
    };
    //Retorna um token de acesso gerado randomicamente e o nome do usuario
    res.status(200).send({ data: data, message: "logged in successfully" });
  } catch (error) {
    //Se ocorrer algum erro interno retorna um erro 500 com a mensagem de erro
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Função de validação dos dados de entrada
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    senha: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
