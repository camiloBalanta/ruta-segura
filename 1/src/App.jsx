import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('usuario')
  const [password, setPassword] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Error al obtener usuarios:', err))
  }, [])

  const agregarUsuario = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, tipo, password })
    })
      .then(res => res.json())
      .then(nuevo => {
        setUsuarios([...usuarios, nuevo])
        setNombre('')
        setTipo('usuario')
        setPassword('')
      })
  }

  return (
    <div className="container">
      <h1>Ruta Segura</h1>
      <form onSubmit={agregarUsuario}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="usuario">Usuario</option>
          <option value="admin">Admin</option>
          <option value="familiar">Familiar</option>
        </select>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>

      <h2>Usuarios registrados:</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>{u.nombre} ({u.tipo})</li>
        ))}
      </ul>
    </div>
  )
}

export default App
