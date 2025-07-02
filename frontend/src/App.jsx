import React from 'react'
import { useEffect, useState } from 'react'

const hablar = (texto) => {
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'es-CO'; // 🇨🇴 español colombiano
  speechSynthesis.speak(utterance);
};

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('usuario')
  const [password, setPassword] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
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
      hablar(`Usuario ${nuevo.nombre} registrado correctamente`)
    })
    .catch(err => {
      hablar('Error al registrar el usuario')
      console.error(err)
    })
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">🚍 Ruta Segura</h1>

        <form onSubmit={agregarUsuario} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="usuario">Usuario</option>
            <option value="admin">Admin</option>
            <option value="familiar">Familiar</option>
          </select>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded transition duration-300"
          >
            Registrar usuario
          </button>
          <button
            onClick={() => {
            const texto = usuarios.map(u => `${u.nombre}, tipo: ${u.tipo}`).join('. ');
            hablar(`Usuarios registrados: ${texto}`);
            }}
            className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
>
            Leer lista de usuarios
          </button>
           </form>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-purple-700">Usuarios registrados:</h2>
        <ul className="space-y-2">
          {usuarios.map((u) => (
            <li key={u.id} className="bg-purple-100 p-3 rounded shadow">
              <span className="font-medium">{u.nombre}</span> <span className="text-sm text-gray-600">({u.tipo})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App