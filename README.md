
# Storify — CRUD de tareas (React + Vite)

![Storify](https://img.shields.io/badge/Storify-React%20%2B%20Vite-blue)

Storify es una pequeña aplicación de ejemplo para gestionar tareas localmente. Está pensada como proyecto didáctico o plantilla base para practicar React, persistencia en el navegador y componentes reutilizables.

Contenido destacado

- Crear, editar y eliminar tareas.
- Búsqueda en tiempo real y filtros por categoría.
- Ordenamiento (recientes / alfabético / categoría).
- Persistencia por usuario: cada usuario tiene su propia lista en `localStorage` (`tareas_<usuario>`).

Demo / Capturas

Agrega aquí tus capturas en `assets/` y la referencia en Markdown para que el README luzca mejor en GitHub. Ejemplo:

```md
![captura](./assets/screenshot.png)
```

Instalación rápida

Requisitos: Node.js (>=16) y npm.

En PowerShell (Windows):

```powershell
cd C:\Users\USER\Desktop\CRUD-localStorage\crud-react
npm install
npm run dev
```

Abre la URL que Vite muestre en la consola (por defecto `http://localhost:5173`).

Uso básico

1. Inicia sesión con un nombre de usuario (la sesión se guarda en `sessionStorage`).
2. Añade tareas desde el campo principal.
3. Usa la búsqueda y los filtros para refinar la lista.

Cómo funciona (breve)

- La aplicación mantiene la sesión del usuario en `sessionStorage` bajo la clave `usuario`.
- Las tareas se guardan en `localStorage` con la clave `tareas_<usuario>`, de forma que cada usuario ve su propia lista.
- El componente `SearchAndFilter` emite callbacks para búsqueda, filtro y orden; `App.jsx` aplica la lógica y devuelve la lista filtrada.

Estructura del proyecto

- `index.html` — HTML base
- `style.css` — estilos globales
- `src/`
  - `main.jsx` — entrada
  - `App.jsx` — componente principal (estado, CRUD y mezcla de componentes)
  - `components/SearchAndFilter.jsx` — UI de búsqueda y filtros
  - `constants.js` — iconos/constantes

Estado actual y notas

- Durante el desarrollo se usaron archivos temporales (`AppFixed.jsx`, `AppClean.jsx`) para recuperar una versión funcional. He consolidado la implementación en `src/App.jsx` y eliminado temporales para mantener el repo limpio.

Despliegue (opcional)

Puedes desplegar la app en Netlify, Vercel o GitHub Pages tras ejecutar `npm run build`. Para una vista previa local de la build:

```powershell
npm run build
npm run preview
```

Buenas prácticas y siguientes pasos sugeridos

- Añadir pruebas unitarias básicas (Jest + React Testing Library).
- Añadir validación más robusta y límites de tamaño para los inputs.
- Localización y accesibilidad (labels, roles, tests de contraste).

Contribuir

Si quieres colaborar, abre un issue o un PR. Sugerencias pequeñas (UI, tests, mejoras de UX) son bienvenidas.

Licencia

Este repositorio no incluye una licencia por defecto. Si quieres, puedo añadir una `LICENSE` (por ejemplo MIT).

Contacto

Hecho por Lucas Fornero. Para cambios grandes, abre un issue en el repositorio.

Versión del README: 27/10/2025
