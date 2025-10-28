import { useState } from 'react'
import './SearchAndFilter.css'

function SearchAndFilter({ onSearch, onFilterChange, onSortChange, disabled = false }) {
  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <div className="search-section">
      <div className="search-box">
        <input
          type="text"
          id="buscar-tarea"
          placeholder={disabled ? 'Inicia sesión para usar la búsqueda' : 'Buscar tareas...'}
          value={searchTerm}
          onChange={(e) => {
            const v = e.target.value
            setSearchTerm(v)
            onSearch && onSearch(v)
          }}
          disabled={disabled}
        />
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor"/>
        </svg>
      </div>
      
      <div className="filter-options">
        <select 
          id="filtro-categoria"
          onChange={(e) => onFilterChange(e.target.value)} 
          defaultValue="todas" 
          disabled={disabled}
        >
          <option value="todas">Todas las categorías</option>
          <option value="universidad">Universidad</option>
          <option value="deporte">Deportes</option>
          <option value="urgente">Urgentes</option>
          <option value="rutina">Rutina</option>
          <option value="otros">Otros</option>
        </select>

        <select 
          id="filtro-orden"
          onChange={(e) => onSortChange(e.target.value)} 
          defaultValue="recientes" 
          disabled={disabled}
        >
          <option value="recientes">Más recientes</option>
          <option value="alfabetico">Alfabético</option>
          <option value="categoria">Por categoría</option>
        </select>
      </div>
    </div>
  )
}

export default SearchAndFilter