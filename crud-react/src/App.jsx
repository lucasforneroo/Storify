import { useState, useEffect } from 'react'
import './App.css'
import { ICONOS_TAREA } from './constants'
import SearchAndFilter from './components/SearchAndFilter'

function Header() {
  return (
    <header>
      <div className="content">
        <h1>STORIFY</h1>
      </div>
    </header>
  )
}

function SessionSection({ user, onLogin, onLogout }) {
  const [username, setUsername] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (username.trim()) {
      onLogin(username.trim())
      setUsername('')
    }
  }

  return (
    <section id="seccion-sesion">
      <h2>Bienvenido a Storify!</h2>
      {user ? (
        <div id="sesion-activa" className="fade show">
          <p id="usuario-saludo">Hola, {user}!</p>
          <button onClick={onLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div id="sesion-form" className="fade show">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese su usuario"
          />
          <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
      )}
    </section>
  )
}

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <ul id="lista-tareas">
      {tasks.map((task) => (
        <li key={task.id} className="fade show" data-tipo={task.tipo}>
          <span>
            <span className="tarea-icon" dangerouslySetInnerHTML={{ __html: ICONOS_TAREA[task.tipo] }} />
            {task.texto}
          </span>
          <div className="task-buttons">
            <button className="edit-btn" onClick={() => onEdit(task.id)}>✏️</button>
            <button className="delete-btn" onClick={() => onDelete(task.id)}>🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])
  const [newTaskText, setNewTaskText] = useState('')
  const [filteredTasks, setFilteredTasks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('todas')
  const [sortType, setSortType] = useState('recientes')

  useEffect(() => {
    const savedUser = sessionStorage.getItem('usuario')
    if (savedUser) {
      setUser(savedUser)
      loadTasks(savedUser)
    }
  }, [])

  useEffect(() => {
    setFilteredTasks(filterAndSortTasks(tasks, searchTerm, activeFilter, sortType))
  }, [tasks, searchTerm, activeFilter, sortType])

  const filterAndSortTasks = (tasksList, search, filter, sort) => {
    let result = [...tasksList]

    if (search) {
      result = result.filter(task => task.texto.toLowerCase().includes(search.toLowerCase()))
    }

    if (filter !== 'todas') {
      result = result.filter(task => task.tipo === filter)
    }

    switch (sort) {
      case 'alfabetico':
        result.sort((a, b) => a.texto.localeCompare(b.texto))
        break
      case 'categoria':
        result.sort((a, b) => a.tipo.localeCompare(b.tipo))
        break
      default:
        result.sort((a, b) => b.createdAt - a.createdAt)
    }

    return result
  }

  const handleSearch = (term) => setSearchTerm(term)
  const handleFilterChange = (filter) => setActiveFilter(filter)
  const handleSortChange = (sort) => setSortType(sort)

  const loadTasks = (username) => {
    const saved = localStorage.getItem(`tareas_${username}`)
    if (saved) {
      const parsedTasks = JSON.parse(saved)
      const tasksWithIds = parsedTasks.map((task, i) => ({
        id: task.id || Date.now() + i,
        texto: task.texto || '',
        tipo: task.tipo || 'otros',
        createdAt: task.createdAt || Date.now()
      }))
      setTasks(tasksWithIds)
    } else {
      setTasks([])
    }
  }

  const saveTasks = (username, tasksList) => {
    localStorage.setItem(`tareas_${username}`, JSON.stringify(tasksList))
  }

  const handleLogin = (username) => {
    sessionStorage.setItem('usuario', username)
    setUser(username)
    loadTasks(username)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('usuario')
    setUser(null)
    setTasks([])
    setSearchTerm('')
    setActiveFilter('todas')
    setSortType('recientes')
  }

  const handleAddTask = () => {
    if (newTaskText.trim() && user) {
      const newTask = {
        id: Date.now() + Math.random(),
        texto: newTaskText.trim(),
        tipo: 'otros',
        createdAt: Date.now()
      }
      const updatedTasks = [newTask, ...tasks]
      setTasks(updatedTasks)
      saveTasks(user, updatedTasks)
      setNewTaskText('')
    }
  }

  const handleEdit = (taskId) => {
    const task = tasks.find(t => t.id === taskId)
    if (task && user) {
      const nueva = prompt('Editar tarea:', task.texto)
      if (nueva && nueva.trim()) {
        const updatedTasks = tasks.map(t =>
          t.id === taskId
            ? { ...t, texto: nueva.trim() }
            : t
        )
        setTasks(updatedTasks)
        saveTasks(user, updatedTasks)
      }
    }
  }

  const handleDelete = (taskId) => {
    if (user && confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      const updatedTasks = tasks.filter(task => task.id !== taskId)
      setTasks(updatedTasks)
      saveTasks(user, updatedTasks)
    }
  }

  return (
    <>
      <Header />

      <main>
        <SessionSection 
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />

        {user && (
          <>
            <hr />
            <section id="seccion-tareas">
              <h2>Tareas</h2>
              
              <div className="input-group">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                  placeholder="Escribe una tarea..."
                />
                <button onClick={handleAddTask}>Agregar</button>
              </div>

              <SearchAndFilter
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                disabled={!user}
              />

              <TaskList
                tasks={filteredTasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              {searchTerm && (
                <p className="search-results">
                  {filteredTasks.length} resultado(s) encontrado(s)
                </p>
              )}

            </section>
          </>
        )}
      </main>

      <footer>
        <p>Hecho por Lucas fornero</p>
      </footer>
    </>
  )
}

export default App