const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let usuarios = [
  { id: 1, nombre: "Juan", tipo: "usuario", password: "12345678" }
];

app.get('/api/usuarios', (req, res) => res.json(usuarios));
app.post('/api/usuarios', (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  usuarios.push(nuevo);
  res.status(201).json(nuevo);
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
