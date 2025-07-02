# Dashboard School - Documentación del Proyecto

## 1. Visión General

**Dashboard School** es una aplicación web para gestionar de forma integral el flujo académico. Permite administrar asignaturas, temarios, notas de tareas y exámenes, notas rápidas, tareas tipo Todoist, calendario de eventos y visualizar métricas relevantes en un dashboard principal.

---

## 2. Funcionalidades Principales

### 2.1 Sección Asignaturas

-   Listado de asignaturas.
-   Gestión del temario para cada asignatura.
-   Gestión de notas de tareas y exámenes por asignatura.

### 2.2 Sección Notas Rápidas

-   Crear, modificar y eliminar notas rápidas.
-   Notas tipo "Mons": sólo creación, sin opción a modificar ni eliminar.

### 2.3 Sección Tareas (To-Do)

-   Crear, modificar, eliminar y marcar tareas como completadas.
-   Organización por prioridad, fecha y etiquetas.

### 2.4 Sección Calendario

-   Visualización y gestión de eventos mediante un calendario (FullCalendar u otro).
-   Formulario para crear eventos con:
    -   Fecha inicio
    -   Fecha fin
    -   Título
    -   Descripción

### 2.5 Dashboard Principal

-   Visualización de métricas clave:
    -   Tareas pendientes
    -   Próximos eventos
    -   Resumen de notas y asignaturas
    -   Estadísticas de rendimiento

---

## 3. Arquitectura Técnica

| Capa          | Tecnología Sugerida                |
| ------------- | ---------------------------------- |
| Frontend      | React.js + TailwindCSS / Chakra UI |
| Backend       | FastAPI / Node.js + Express        |
| Base de datos | PostgreSQL / MySQL                 |
| Autenticación | JWT / Auth0 / Clerk                |
| Calendario    | FullCalendar                       |

---

## 4. Modelos de Datos

### Asignaturas

| Campo          | Tipo       | Descripción          |
| -------------- | ---------- | -------------------- |
| id             | UUID / int | Identificador único  |
| nombre         | string     | Nombre asignatura    |
| descripcion    | string     | Descripción opcional |
| fecha_creacion | datetime   | Fecha de creación    |

### Temario

| Campo         | Tipo       | Descripción             |
| ------------- | ---------- | ----------------------- |
| id            | UUID / int | Identificador único     |
| asignatura_id | FK         | Relación con asignatura |
| titulo        | string     | Título del tema         |
| contenido     | text       | Contenido del tema      |

### Notas de Tareas

| Campo         | Tipo       | Descripción             |
| ------------- | ---------- | ----------------------- |
| id            | UUID / int | Identificador único     |
| asignatura_id | FK         | Relación con asignatura |
| titulo        | string     | Título                  |
| contenido     | text       | Contenido               |
| fecha         | datetime   | Fecha de la nota        |

### Notas de Exámenes

| Campo         | Tipo       | Descripción             |
| ------------- | ---------- | ----------------------- |
| id            | UUID / int | Identificador único     |
| asignatura_id | FK         | Relación con asignatura |
| titulo        | string     | Título del examen       |
| nota          | decimal    | Nota obtenida           |
| fecha         | datetime   | Fecha del examen        |

### Notas Rápidas

| Campo          | Tipo       | Descripción         |
| -------------- | ---------- | ------------------- |
| id             | UUID / int | Identificador único |
| tipo           | enum       | "rápida" o "Mons"   |
| titulo         | string     | Título              |
| contenido      | text       | Contenido           |
| fecha_creacion | datetime   | Fecha de creación   |

### Tareas (To-Do)

| Campo             | Tipo       | Descripción                |
| ----------------- | ---------- | -------------------------- |
| id                | UUID / int | Identificador único        |
| titulo            | string     | Título de la tarea         |
| descripcion       | text       | Descripción                |
| estado            | enum       | "pendiente" o "completada" |
| prioridad         | int        | Nivel de prioridad         |
| fecha_creacion    | datetime   | Fecha de creación          |
| fecha_vencimiento | datetime   | Fecha límite               |

### Eventos Calendario

| Campo        | Tipo       | Descripción         |
| ------------ | ---------- | ------------------- |
| id           | UUID / int | Identificador único |
| titulo       | string     | Título del evento   |
| descripcion  | text       | Descripción         |
| fecha_inicio | datetime   | Fecha de inicio     |
| fecha_fin    | datetime   | Fecha de fin        |

---

## 5. Flujo de Usuario

1. Usuario accede al Dashboard.
2. Consulta métricas principales en Home.
3. Navega a la sección de asignaturas para gestionar temario y notas.
4. Crea o edita notas rápidas.
5. Gestiona tareas en la sección To-Do.
6. Consulta y crea eventos en el calendario.
7. Todas las acciones se guardan y actualizan en la base de datos con feedback inmediato.

---

## 6. API Propuesta (Endpoints REST)

| Método | Ruta                      | Descripción                       |
| ------ | ------------------------- | --------------------------------- |
| GET    | /asignaturas              | Listar asignaturas                |
| POST   | /asignaturas              | Crear asignatura                  |
| GET    | /asignaturas/{id}         | Detalle asignatura                |
| PUT    | /asignaturas/{id}         | Modificar asignatura              |
| DELETE | /asignaturas/{id}         | Eliminar asignatura               |
| GET    | /asignaturas/{id}/temario | Listar temario asignatura         |
| POST   | /asignaturas/{id}/temario | Crear tema                        |
| GET    | /notas_rapidas            | Listar notas rápidas              |
| POST   | /notas_rapidas            | Crear nota rápida                 |
| PUT    | /notas_rapidas/{id}       | Modificar nota rápida (no "Mons") |
| DELETE | /notas_rapidas/{id}       | Eliminar nota rápida (no "Mons")  |
| GET    | /tareas                   | Listar tareas                     |
| POST   | /tareas                   | Crear tarea                       |
| PUT    | /tareas/{id}              | Modificar tarea                   |
| DELETE | /tareas/{id}              | Eliminar tarea                    |
| GET    | /eventos                  | Listar eventos                    |
| POST   | /eventos                  | Crear evento                      |

---

## 7. Planificación

| Fase                 | Tiempo Estimado | Descripción                       |
| -------------------- | --------------- | --------------------------------- |
| Análisis & Diseño    | 1 semana        | Requisitos, diagramas, prototipos |
| Backend API          | 2-3 semanas     | Modelos, endpoints, autenticación |
| Frontend MVP         | 2-3 semanas     | Navegación, vistas básicas        |
| Calendario           | 1 semana        | Integración FullCalendar          |
| Notas Rápidas        | 1 semana        | CRUD notas rápidas                |
| Tareas (To-Do)       | 1 semana        | Funcionalidad completa            |
| Métricas & Dashboard | 1 semana        | Visualización estadísticas        |
| Testing & QA         | 1 semana        | Pruebas integrales y UX           |

---

## 8. Tecnologías Clave

-   React.js + TailwindCSS / Chakra UI
-   FastAPI / Node.js + Express
-   PostgreSQL / MySQL
-   JWT / Auth0 / Clerk
-   FullCalendar para el calendario

---

## 9. Recomendaciones

-   Uso de control de versiones (Git).
-   Documentación actualizada.
-   Revisión y feedback constantes.
-   Modularidad y escalabilidad desde el inicio.

---
