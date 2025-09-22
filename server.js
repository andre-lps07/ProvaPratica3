const express = require("express");
const path = require("path");
const usersRoutes = require("./rotas/users");
const logger = require("./middleware/logger");

const app = express();
app.use(express.json());
app.use(logger);

// Public
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API
app.use("/api/users", usersRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
