# 📚 Aplicación de Inscripciones

Bienvenido a la Aplicación de Inscripciones, una plataforma donde los estudiantes pueden inscribirse en materias, profesores y horarios.

Existen 3 tipos de usuarios:

- Estudiante
- Profesor
- Administrador

El unico que puede ingresar como administrador es el usuario que se registro como administrador en el backend.

<b> correo: admin@admin.com</b>

<b>contraseña: admin</b>

## Rol Estudiantes

- Pueden visualizar las materias disponibles para inscripción
- Pueden inscribirse a las materias
- Pueden buscar materias
- Puede darse de baja de una materia y liberar creditos
- Puede visualizar compañeros de clase

***Restricciones***

- No puede inscribir mas de 9 creditos


## Rol Profesores

- Pueden visualizar los cursos que tienen asignados
- Puede asignarse una materia que este disponible

***Restricciones***

- No puede asignarse mas de 2 materias 

## Rol Administrador

- Puede registrar una nueva materia, con codigo, nombre, descripcion, creditos y cupos
- Puede eliminar una materia
- Puede actualizar una materia
- Puede desasignar un profesor de un curso

***Restricciones***

- No puede eliminar una materia que tenga estudiantes inscritos
- No puede actualizar una materia que tenga estudiantes inscritos
- No puede desasignar un profesor de un curso que tenga estudiantes inscritos

## 🌟 Características Principales

- 📖 Visualización de materias
- ✍️ Sistema de inscripciones
- 🔍 Búsqueda avanzada de materias
- 📱 Diseño responsivo para todos los dispositivos

## 🚀 Despliegue

### Enlaces Importantes

| Recurso | URL |
|---------|-----|
| 🖥️ **Sitio Web** | [Enlace de Producción](https://inscripcionestudiantes.netlify.app/) |
| ⚙️ **API** | [URL del API](https://apiinscripcionmaterias20250604181220-bhg9dybychf8axd0.canadacentral-01.azurewebsites.net/swagger/index.html) |
| 📂 **Repositorio del API** | [Repositorio del API](https://github.com/jeyfredc/ApiInscripcionMaterias) |  
| 📂 **Repositorio del Frontend** | [Repositorio del Frontend](https://github.com/jeyfredc/inscripcionesWebPage) | 

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React, TypeScript, Vite, Zustand, React Router, React Icons, React Toastify, Tailwind CSS
- **Backend**: [.Net 8 ]
- **Base de Datos**: [SQLSERVER]
- **Autenticación**: [JWT]
- **Despliegue**: [Netlify  para el Frontend y Azure para el Backend]

## 📚 Características del Proyecto

- [x] Visualización de materias
- [x] Sistema de inscripciones
- [x] Búsqueda avanzada de materias
- [x] Diseño responsivo para todos los dispositivos
- [x] Sistema de autenticación



## 🚀 Empezando

### Requisitos Previos para el despliegue del Frontend

- Node.js (versión 16 o superior)
- npm o yarn


### Instalación del Frontend

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jeyfredc/inscripcionesWebPage.git
   cd inscripcionesWebPage
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Variables de entorno:
   ```bash
   #Ya estan en el repositorio por practicidad en los archivos
   .env.development
   .env.production
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```
### Instalación del Backend

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jeyfredc/ApiInscripcionMaterias.git
   cd ApiInscripcionMaterias
   ```

2. Instala las dependencias:
   ```bash
   dotnet restore
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   dotnet run
   ```

4. DefaultConnection:
 ```bash 
 Server=gastos-server.database.windows.net;
 User=gastos-serverDb;
 Password=Tryal2025*;
 Database=MATERIAS;
 ```

## Recomendación

1. Puedes utilizar SQL Server Management Studio para visualizar la base de datos

```bash
Host: gastos-server.database.windows.net
Username: gastos-serverDb
Password: Tryal2025*
```

2. Puedes utilizar Postman para probar la APIs

```bash
URL: https://apiinscripcionmaterias20250604181220-bhg9dybychf8axd0.canadacentral-01.azurewebsites.net/swagger/index.html
```

3. Descripción y uso del Api

## 📚 Documentación de la API

## 🏗️ Arquitectura y Características del API

### Características Principales
- **RESTful API** - Sigue los principios REST
- **Autenticación JWT** - Seguridad basada en tokens
- **Documentación Swagger** - Documentación interactiva de la API
- **Validación de Datos** - Validación de modelos y DTOs
- **Manejo de Errores** - Respuestas estandarizadas de error

### Arquitectura

#### 1. Patrón por Capas
- **Capa de Presentación (Controllers)**
  - Gestiona las peticiones HTTP
  - Enruta a los servicios correspondientes
  - Retorna respuestas HTTP estandarizadas

- **Capa de Servicios**
  - Contiene la lógica de negocio
  - Coordina operaciones entre diferentes DAOs
  - Maneja la lógica de transacciones

- **Capa de Acceso a Datos (DAO)**
  - Gestiona el acceso a la base de datos
  - Implementa operaciones CRUD
  - Aísla el código de acceso a datos

#### 2. Patrones de Diseño
- **Repositorio** - Para el acceso a datos
- **DTO (Data Transfer Object)** - Para transferencia segura de datos
- **Inyección de Dependencias** - Para un bajo acoplamiento

#### 3. Tecnologías Clave
- **.NET Core** - Framework principal
- **Entity Framework Core** - ORM para acceso a datos
- **SQL Server** - Base de datos relacional
- **JWT** - Para autenticación
- **Swagger/OpenAPI** - Documentación interactiva

### Estructura del Proyecto
```
ApiInscripcionMaterias/
├── Controllers/        # Controladores de la API
├── Services/           # Lógica de negocio
├── Models/
│   ├── DAO/           # Data Access Objects
│   ├── DTOs/          # Data Transfer Objects
│   └── Entities/      # Entidades de dominio
├── Interfaces/         # Contratos de servicios
```

### Flujo de una Petición Típica
1. Cliente realiza una petición HTTP
2. Middleware de autenticación valida el token JWT
3. Controlador recibe y valida la petición
4. Servicio procesa la lógica de negocio
5. DAO interactúa con la base de datos
6. Respuesta fluye de vuelta al cliente

### Autenticación

#### Registrar un nuevo usuario
- **Método**: `POST`
- **Ruta**: `/auth/register`
- **Descripción**: Registra un nuevo usuario en el sistema.
- **Body**:
  ```json
  {
    "nombre": "string",
    "apellido": "string",
    "email": "string",
    "password": "string",
    "rol": "string"
  }
  ```

#### Iniciar sesión
- **Método**: `POST`
- **Ruta**: `/auth/login`
- **Descripción**: Inicia sesión y devuelve un token JWT.
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### Cursos

#### Obtener cursos disponibles
- **Método**: `GET`
- **Ruta**: `/Courses/available-courses`
- **Descripción**: Obtiene la lista de cursos disponibles para inscripción.

#### Inscribirse a un curso
- **Método**: `POST`
- **Ruta**: `/Courses/inscription-course`
- **Descripción**: Permite a un estudiante inscribirse a un curso.
- **Body**:
  ```json
  {
    "studentId": 0,
    "codigoMateria": "string"
  }
  ```

#### Eliminar inscripción a un curso
- **Método**: `DELETE`
- **Ruta**: `/Courses/remove-student-course`
- **Descripción**: Elimina la inscripción de un estudiante a un curso.
- **Body**:
  ```json
  [
    {
      "studentId": 0,
      "codigoMateria": "string"
    }
  ]
  ```

#### Obtener cursos sin asignar
- **Método**: `GET`
- **Ruta**: `/Courses/unassigned-courses`
- **Descripción**: Obtiene la lista de cursos que no tienen profesor asignado.

#### Asignar profesor a un curso
- **Método**: `POST`
- **Ruta**: `/Courses/assign-course-teacher`
- **Descripción**: Asigna un profesor a un curso específico.
- **Body**:
  ```json
  {
    "profesorId": 0,
    "codigoMateria": "string"
  }
  ```

#### Registrar un nuevo curso
- **Método**: `POST`
- **Ruta**: `/Courses/register-new-course`
- **Descripción**: Crea un nuevo curso en el sistema.
- **Body**:
  ```json
  {
    "codigo": "string",
    "nombre": "string",
    "descripcion": "string",
    "creditos": 0,
    "cupoMaximo": 0,
    "horarios": "string"
  }
  ```

#### Obtener cursos con horarios
- **Método**: `GET`
- **Ruta**: `/Courses/courses-and-schedules`
- **Descripción**: Obtiene la lista de cursos con sus respectivos horarios.

#### Eliminar una materia
- **Método**: `DELETE`
- **Ruta**: `/Courses/{codigoMateria}`
- **Descripción**: Elimina una materia del sistema por su código.

#### Actualizar una materia
- **Método**: `PUT`
- **Ruta**: `/Courses/update-subject`
- **Descripción**: Actualiza la información de una materia existente.
- **Body**:
  ```json
  {
    "materiaId": 0,
    "codigo": "string",
    "nombre": "string",
    "descripcion": "string",
    "creditos": 0,
    "cupoMaximo": 0,
    "horarios": "string"
  }
  ```

### Profesores

#### Obtener cursos asignados a un profesor
- **Método**: `GET`
- **Ruta**: `/Teacher/assigned-courses/{id}`
- **Descripción**: Obtiene los cursos asignados a un profesor específico.

#### Desasignar profesor de un curso
- **Método**: `POST`
- **Ruta**: `/Teacher/unassign-teacher`
- **Descripción**: Desasigna un profesor de un curso específico.
- **Body**:
  ```json
  {
    "profesorId": 0,
    "codigoMateria": "string"
  }
  ```

### Estudiantes

#### Obtener créditos de un estudiante
- **Método**: `GET`
- **Ruta**: `/Student/credits/{id}`
- **Descripción**: Obtiene la información de créditos de un estudiante.

#### Obtener cursos de un estudiante
- **Método**: `GET`
- **Ruta**: `/Student/coursesById/{studentId}`
- **Descripción**: Obtiene la lista de cursos en los que está inscrito un estudiante.

#### Obtener compañeros de clase
- **Método**: `GET`
- **Ruta**: `/Student/getClassMatesByStudentId/{studentId}/{codigoMateria}`
- **Descripción**: Obtiene la lista de compañeros de clase de un estudiante en un curso específico.

## 📧 Contacto

Para más información, por favor contacta a [jeyfredc@gmail.com]
