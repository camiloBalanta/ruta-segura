const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); 

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de conexión PostgreSQL
const pool = new Pool({
  host: 'localhost',      
  user: 'postgres',      
  password: '123',
  database: 'rutasegura', 
  port: 5432
});

// Verificar conexión a la base de datos
app.get('/api/usuarios', async (req, res) => {
  const result = await pool.query('SELECT * FROM usuarios');
  res.json(result.rows);
});

// Endpoint para agregar un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
  const { nombre, tipo, password } = req.body;
  const result = await pool.query(
    'INSERT INTO usuarios (nombre, tipo, password) VALUES ($1, $2, $3) RETURNING *',
    [nombre, tipo, password]
  );
  res.status(201).json(result.rows[0]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});