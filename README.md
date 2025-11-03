#  Storify — CRUD de tareas (React + Vite)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

> Una aplicación moderna para gestionar tareas localmente con React y Vite. Perfecta como proyecto didáctico o plantilla base.

---

##  Tabla de Contenidos

- [Características](#-características)
- [Demo](#-demo--capturas)
- [Instalación](#-instalación-rápida)
- [Uso](#-uso-básico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Despliegue](#-despliegue)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

##  Características

-  **CRUD completo** — Crear, editar y eliminar tareas
-  **Búsqueda en tiempo real** — Encuentra tareas al instante
-  **Filtros por categoría** — Organiza tus tareas eficientemente
-  **Múltiples ordenamientos** — Por fecha, alfabético o categoría
-  **Multi-usuario** — Cada usuario tiene su propia lista independiente
-  **Persistencia local** — Datos guardados en `localStorage` sin necesidad de backend
-  **Rápida y ligera** — Construida con Vite para máxima velocidad

---

##  Demo / Capturas

<!-- Agrega tu captura aquí -->
![Captura de Storify] *(Próximamente)*


<!-- Si tienes demo en vivo, añade el link -->
**[Ver Demo en Vivo](#)** *(Próximamente)*

---

##  Instalación rápida

### Requisitos previos
- Node.js (>=16)
- npm o yarn

### Pasos

1. **Clona el repositorio**
```bash
   git clone https://github.com/tu-usuario/storify.git
   cd storify
```

2. **Instala las dependencias**
```bash
   npm install
```

3. **Inicia el servidor de desarrollo**
```bash
   npm run dev
```

4. **Abre tu navegador**
```
   http://localhost:5173
```

---

##  Uso básico

1. **Inicia sesión** con un nombre de usuario (se guarda en `sessionStorage`)
2. **Añade tareas** usando el campo de entrada principal
3. **Busca y filtra** tus tareas según necesites
4. **Edita o elimina** tareas con los botones de acción

### Cómo funciona internamente

-  **Sesión de usuario**: Guardada en `sessionStorage` bajo la clave `usuario`
-  **Almacenamiento de tareas**: En `localStorage` con la clave `tareas_<usuario>`
-  **Aislamiento por usuario**: Cada usuario ve únicamente sus propias tareas
-  **Componentes reutilizables**: Arquitectura modular para fácil mantenimiento

---

## 📁 Estructura del proyecto
```
storify/
├── public/
├── src/
│   ├── components/
│   │   └── SearchAndFilter.jsx    # Búsqueda y filtros
│   ├── App.jsx                     # Componente principal
│   ├── main.jsx                    # Punto de entrada
│   └── constants.js                # Constantes e iconos
├── assets/                         # Imágenes y recursos
├── index.html                      # HTML base
├── style.css                       # Estilos globales
├── package.json
└── vite.config.js
```

---

##  Despliegue

### Build de producción
```bash
npm run build
```

### Vista previa local de la build
```bash
npm run preview
```

### Opciones de despliegue recomendadas

- **Vercel**: Deploy automático desde GitHub
- **Netlify**: Drag & drop de la carpeta `dist`
- **GitHub Pages**: Configuración con GitHub Actions

---

##  Próximas mejoras

- [ ] Pruebas unitarias (Jest + React Testing Library)
- [ ] Validación de formularios más robusta
- [ ] Modo oscuro / claro
- [ ] Internacionalización (i18n)
- [ ] Mejoras de accesibilidad (ARIA labels, keyboard navigation)
- [ ] Backend opcional con API REST
- [ ] Autenticación con Firebase/Supabase

---

##  Contribuir

¡Las contribuciones son bienvenidas! Si quieres colaborar:

1.  Fork el proyecto
2.  Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3.  Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4.  Push a la rama (`git push origin feature/AmazingFeature`)
5.  Abre un Pull Request

Para cambios grandes, abre primero un issue para discutir los cambios propuestos.

---

##  Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
```
MIT License - Copyright (c) 2025 Lucas Fornero
```

---

##  Contacto

**Lucas Fornero**

- GitHub: [@lucasforneroo](https://github.com/lucasforneroo)
- LinkedIn: [Lucas Fornero](https://linkedin.com/in/Lucas-Fornero)
- Email: lucasfornero2012@gmail.com

---

<div align="center">

**⭐ Si te gustó este proyecto, dale una estrella en GitHub ⭐**

*Última actualización: 28 de octubre de 2025*

</div>
