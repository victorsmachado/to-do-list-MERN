const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

//Definição dos controladores do usuário

//Rota de criação de usuário post
router.post("/", async (req, res) => {
  try {
    //Validação dos dados de entrada, os dados de entrada necessitam
    //nome: string normal
    //email:string e um email valido
    //senha: string um caracter maiusculo, um minusculo, um numero e um caracter especial e 8 digitos!
    //endereco: string normal
    const { error } = validate(req.body);
    if (error)
      //Se não cumpre os requisitos retorna um erro 400 com a mensagem de erro
      return res.status(400).send({ message: error.details[0].message });

    //Tenta encontrar o usuario pelo email enviado na requisição
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "Já existe usuário com esse email!" });

    //Gera uma criptografia na senha do usuario
    const salt = await bcrypt.genSalt(Number("10"));
    const hashSenha = await bcrypt.hash(req.body.senha, salt);

    //Cria um novo usuario com os dados enviados na requisição
    await new User({ ...req.body, senha: hashSenha }).save();
    res.status(201).send({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: "Erro interno" });
  }
});

//Rota de alteração dos dados do usuário através do id put
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send({ message: "Erro interno" });
  }
});

//Rota de exclusão do usuário através do id delete
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send({ message: "Erro interno" });
  }
});

//Rota de listagem de usuário através do ID get necessitando HEADER de authorization com o token de acesso
router.get("/getById/:id", checkToken, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id, "-senha");
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send({ message: "Erro interno" });
  }
});

//Rota para checar se o token é valido
function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Acesso negado!" });
  }
  try {
    const secret =
      "eyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5ceyJhbGciJIUzI1NiIsInR5c";
    if (token == secret) return next();
  } catch (error) {
    res.status(400).send({ message: "Token inválido!" });
  }
}

module.exports = router;
