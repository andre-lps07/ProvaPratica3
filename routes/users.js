const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "..db.json");

// Funções auxiliares
function getUsers() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
  return JSON.parse(fs.readFileSync(filePath));
}

function saveUsers(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// POST /register → cadastrar novo usuário.
router.post("/", (req, res) => {
    const { nome, email, senha} = req.body;
    const users = getUsers();
  
    const novo = { id: Date.now(), nome, email, senha};
    users.push(novo);
    saveUsers(users);
  
    res.status(201).json(novo);
  });
  

// GET /users → listar todos os usuários.
router.get("/", (req, res) => {
  res.json(getUsers());
});


//GET /users/:id → buscar um usuário específico por id.
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const users = getUsers();
    const index = users.findIndex(j => j.id == id);
  
    if (index < 0) return res.status(404).json({ msg: "Usuário não encontrado" });
});


// PUT /users/:id → atualizar dados de um usuário
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const users = getUsers();
  const index = users.findIndex(j => j.id == id);

  if (index < 0) return res.status(404).json({ msg: "Usuário não encontrado" });

  users[index] = { ...users[index], ...req.body };
  saveUsers(users);

  res.json(users[index]);
});

// DELETE /users/:id → remover usuário
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let users = getUsers();

  users = users.filter(j => j.id != id);
  saveUsers(users);

  res.json({ msg: "Usuário removido com sucesso" });
});

module.exports = router;