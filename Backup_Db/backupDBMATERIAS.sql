/****** Object:  StoredProcedure [dbo].[sp_RegistrarUsuario]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_RegistrarUsuario]
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerUsuarioCompletoPorEmail]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_ObtenerUsuarioCompletoPorEmail]
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerMateriasPorProfesor]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_ObtenerMateriasPorProfesor]
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerMateriasNoAsignadas]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_ObtenerMateriasNoAsignadas]
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerMateriasDisponibles]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_ObtenerMateriasDisponibles]
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerMateriasConEstadoAsignacion]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_ObtenerMateriasConEstadoAsignacion]
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerHorarioEstudiante]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_ObtenerHorarioEstudiante]
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerCreditosEstudiante]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_ObtenerCreditosEstudiante]
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerCompanerosClase]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_ObtenerCompanerosClase]
GO
/****** Object:  StoredProcedure [dbo].[sp_MatricularMateria]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_MatricularMateria]
GO
/****** Object:  StoredProcedure [dbo].[sp_EliminarMateria]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_EliminarMateria]
GO
/****** Object:  StoredProcedure [dbo].[sp_EliminarAsignacionMateriaProfesor]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_EliminarAsignacionMateriaProfesor]
GO
/****** Object:  StoredProcedure [dbo].[sp_DesmatricularMateria]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_DesmatricularMateria]
GO
/****** Object:  StoredProcedure [dbo].[sp_CrearMateria]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_CrearMateria]
GO
/****** Object:  StoredProcedure [dbo].[sp_AsignarMateriaProfesor]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_AsignarMateriaProfesor]
GO
/****** Object:  StoredProcedure [dbo].[sp_ActualizarMateria]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP PROCEDURE [dbo].[sp_ActualizarMateria]
GO
ALTER TABLE [dbo].[usuarios] DROP CONSTRAINT [FK__usuarios__rol_id__6477ECF3]
GO
ALTER TABLE [dbo].[profesores] DROP CONSTRAINT [FK__profesore__usuar__72C60C4A]
GO
ALTER TABLE [dbo].[materias_profesores] DROP CONSTRAINT [FK__materias___profe__7F2BE32F]
GO
ALTER TABLE [dbo].[materias_profesores] DROP CONSTRAINT [FK__materias___mater__7E37BEF6]
GO
ALTER TABLE [dbo].[inscripciones] DROP CONSTRAINT [FK__inscripci__mater__05D8E0BE]
GO
ALTER TABLE [dbo].[inscripciones] DROP CONSTRAINT [FK__inscripci__estud__04E4BC85]
GO
ALTER TABLE [dbo].[estudiantes] DROP CONSTRAINT [FK__estudiant__usuar__6D0D32F4]
GO
ALTER TABLE [dbo].[usuarios] DROP CONSTRAINT [DF__usuarios__actual__6383C8BA]
GO
ALTER TABLE [dbo].[usuarios] DROP CONSTRAINT [DF__usuarios__creado__628FA481]
GO
ALTER TABLE [dbo].[usuarios] DROP CONSTRAINT [DF__usuarios__activo__619B8048]
GO
ALTER TABLE [dbo].[roles] DROP CONSTRAINT [DF__roles__creado_en__5DCAEF64]
GO
ALTER TABLE [dbo].[profesores] DROP CONSTRAINT [DF__profesore__cread__71D1E811]
GO
ALTER TABLE [dbo].[profesores] DROP CONSTRAINT [DF__profesore__activ__70DDC3D8]
GO
ALTER TABLE [dbo].[materias_profesores] DROP CONSTRAINT [DF__materias___activ__7D439ABD]
GO
ALTER TABLE [dbo].[materias] DROP CONSTRAINT [DF_materias_cupo_disponible]
GO
ALTER TABLE [dbo].[materias] DROP CONSTRAINT [DF__materias__creado__797309D9]
GO
ALTER TABLE [dbo].[materias] DROP CONSTRAINT [DF__materias__activa__787EE5A0]
GO
ALTER TABLE [dbo].[materias] DROP CONSTRAINT [DF__materias__cupo_m__778AC167]
GO
ALTER TABLE [dbo].[materias] DROP CONSTRAINT [DF__materias__credit__76969D2E]
GO
ALTER TABLE [dbo].[inscripciones] DROP CONSTRAINT [DF__inscripci__estad__03F0984C]
GO
ALTER TABLE [dbo].[inscripciones] DROP CONSTRAINT [DF__inscripci__fecha__02FC7413]
GO
ALTER TABLE [dbo].[estudiantes] DROP CONSTRAINT [DF__estudiant__cread__6C190EBB]
GO
ALTER TABLE [dbo].[estudiantes] DROP CONSTRAINT [DF__estudiant__activ__6B24EA82]
GO
ALTER TABLE [dbo].[estudiantes] DROP CONSTRAINT [DF__estudiant__credi__6A30C649]
GO
ALTER TABLE [dbo].[estudiantes] DROP CONSTRAINT [DF__estudiant__credi__693CA210]
GO
/****** Object:  Index [UQ__usuarios__AB6E616486586134]    Script Date: 12/06/2025 9:43:58 a. m. ******/
ALTER TABLE [dbo].[usuarios] DROP CONSTRAINT [UQ__usuarios__AB6E616486586134]
GO
/****** Object:  Index [UQ__roles__72AFBCC6C059C877]    Script Date: 12/06/2025 9:43:58 a. m. ******/
ALTER TABLE [dbo].[roles] DROP CONSTRAINT [UQ__roles__72AFBCC6C059C877]
GO
/****** Object:  Index [UQ__profesor__2ED7D2AE0C6E3465]    Script Date: 12/06/2025 9:43:58 a. m. ******/
ALTER TABLE [dbo].[profesores] DROP CONSTRAINT [UQ__profesor__2ED7D2AE0C6E3465]
GO
/****** Object:  Index [UQ_materia_profesor_grupo]    Script Date: 12/06/2025 9:43:58 a. m. ******/
ALTER TABLE [dbo].[materias_profesores] DROP CONSTRAINT [UQ_materia_profesor_grupo]
GO
/****** Object:  Index [UQ__materias__40F9A206268D1F66]    Script Date: 12/06/2025 9:43:58 a. m. ******/
ALTER TABLE [dbo].[materias] DROP CONSTRAINT [UQ__materias__40F9A206268D1F66]
GO
/****** Object:  Index [UQ_estudiante_materia]    Script Date: 12/06/2025 9:43:58 a. m. ******/
ALTER TABLE [dbo].[inscripciones] DROP CONSTRAINT [UQ_estudiante_materia]
GO
/****** Object:  Index [UQ__estudian__30962D15A24B68EE]    Script Date: 12/06/2025 9:43:58 a. m. ******/
ALTER TABLE [dbo].[estudiantes] DROP CONSTRAINT [UQ__estudian__30962D15A24B68EE]
GO
/****** Object:  Index [UQ__estudian__2ED7D2AED886A7D7]    Script Date: 12/06/2025 9:43:58 a. m. ******/
ALTER TABLE [dbo].[estudiantes] DROP CONSTRAINT [UQ__estudian__2ED7D2AED886A7D7]
GO
/****** Object:  Table [dbo].[usuarios]    Script Date: 12/06/2025 9:43:58 a. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usuarios]') AND type in (N'U'))
DROP TABLE [dbo].[usuarios]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 12/06/2025 9:43:58 a. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[roles]') AND type in (N'U'))
DROP TABLE [dbo].[roles]
GO
/****** Object:  Table [dbo].[profesores]    Script Date: 12/06/2025 9:43:58 a. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[profesores]') AND type in (N'U'))
DROP TABLE [dbo].[profesores]
GO
/****** Object:  Table [dbo].[materias_profesores]    Script Date: 12/06/2025 9:43:58 a. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[materias_profesores]') AND type in (N'U'))
DROP TABLE [dbo].[materias_profesores]
GO
/****** Object:  Table [dbo].[materias]    Script Date: 12/06/2025 9:43:58 a. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[materias]') AND type in (N'U'))
DROP TABLE [dbo].[materias]
GO
/****** Object:  Table [dbo].[inscripciones]    Script Date: 12/06/2025 9:43:58 a. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[inscripciones]') AND type in (N'U'))
DROP TABLE [dbo].[inscripciones]
GO
/****** Object:  Table [dbo].[estudiantes]    Script Date: 12/06/2025 9:43:58 a. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[estudiantes]') AND type in (N'U'))
DROP TABLE [dbo].[estudiantes]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 12/06/2025 9:43:58 a. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[__EFMigrationsHistory]') AND type in (N'U'))
DROP TABLE [dbo].[__EFMigrationsHistory]
GO
/****** Object:  Database [MATERIAS]    Script Date: 12/06/2025 9:43:58 a. m. ******/
DROP DATABASE [MATERIAS]
GO
/****** Object:  Database [MATERIAS]    Script Date: 12/06/2025 9:43:58 a. m. ******/
CREATE DATABASE [MATERIAS]  (EDITION = 'GeneralPurpose', SERVICE_OBJECTIVE = 'GP_Gen5_2', MAXSIZE = 32 GB) WITH CATALOG_COLLATION = SQL_Latin1_General_CP1_CI_AS, LEDGER = OFF;
GO
ALTER DATABASE [MATERIAS] SET COMPATIBILITY_LEVEL = 170
GO
ALTER DATABASE [MATERIAS] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MATERIAS] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MATERIAS] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MATERIAS] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MATERIAS] SET ARITHABORT OFF 
GO
ALTER DATABASE [MATERIAS] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MATERIAS] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MATERIAS] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MATERIAS] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MATERIAS] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MATERIAS] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MATERIAS] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MATERIAS] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MATERIAS] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [MATERIAS] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MATERIAS] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [MATERIAS] SET  MULTI_USER 
GO
ALTER DATABASE [MATERIAS] SET ENCRYPTION ON
GO
ALTER DATABASE [MATERIAS] SET QUERY_STORE = ON
GO
ALTER DATABASE [MATERIAS] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 100, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
/*** Los scripts de las configuraciones con ámbito de base de datos en Azure deben ejecutarse dentro de la conexión de base de datos de destino. ***/
GO
-- ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 8;
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 12/06/2025 9:43:58 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estudiantes]    Script Date: 12/06/2025 9:43:59 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estudiantes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[usuario_id] [int] NULL,
	[matricula] [varchar](20) NULL,
	[creditos_totales] [int] NULL,
	[creditos_disponibles] [int] NULL,
	[activo] [bit] NULL,
	[creado_en] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[inscripciones]    Script Date: 12/06/2025 9:43:59 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inscripciones](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[estudiante_id] [int] NULL,
	[materia_profesor_id] [int] NULL,
	[fecha_inscripcion] [datetime2](7) NULL,
	[estado] [varchar](20) NULL,
	[calificacion] [decimal](3, 1) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[materias]    Script Date: 12/06/2025 9:43:59 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[materias](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[codigo] [varchar](20) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
	[descripcion] [text] NULL,
	[creditos] [int] NULL,
	[cupo_maximo] [int] NULL,
	[activa] [bit] NULL,
	[creado_en] [datetime2](7) NULL,
	[cupo_disponible] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[materias_profesores]    Script Date: 12/06/2025 9:43:59 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[materias_profesores](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[materia_id] [int] NULL,
	[profesor_id] [int] NULL,
	[grupo] [varchar](10) NULL,
	[horario] [text] NULL,
	[activo] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[profesores]    Script Date: 12/06/2025 9:43:59 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[profesores](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[usuario_id] [int] NULL,
	[especialidad] [varchar](100) NULL,
	[activo] [bit] NULL,
	[creado_en] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 12/06/2025 9:43:59 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[descripcion] [text] NULL,
	[creado_en] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuarios]    Script Date: 12/06/2025 9:43:59 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
	[email] [varchar](255) NOT NULL,
	[password_hash] [varchar](255) NOT NULL,
	[rol_id] [int] NULL,
	[activo] [bit] NULL,
	[creado_en] [datetime2](7) NULL,
	[actualizado_en] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[estudiantes] ON 

INSERT [dbo].[estudiantes] ([id], [usuario_id], [matricula], [creditos_totales], [creditos_disponibles], [activo], [creado_en]) VALUES (18, 3, N'E92288784', 10, 1, 1, CAST(N'2025-06-08T01:24:43.1600000' AS DateTime2))
INSERT [dbo].[estudiantes] ([id], [usuario_id], [matricula], [creditos_totales], [creditos_disponibles], [activo], [creado_en]) VALUES (19, 4, N'E26511719', 10, 7, 1, CAST(N'2025-06-08T01:25:19.8733333' AS DateTime2))
INSERT [dbo].[estudiantes] ([id], [usuario_id], [matricula], [creditos_totales], [creditos_disponibles], [activo], [creado_en]) VALUES (20, 7, N'E09039852', 10, 10, 1, CAST(N'2025-06-08T16:38:17.6833333' AS DateTime2))
INSERT [dbo].[estudiantes] ([id], [usuario_id], [matricula], [creditos_totales], [creditos_disponibles], [activo], [creado_en]) VALUES (21, 8, N'E93798015', 10, 1, 1, CAST(N'2025-06-08T16:40:41.5400000' AS DateTime2))
INSERT [dbo].[estudiantes] ([id], [usuario_id], [matricula], [creditos_totales], [creditos_disponibles], [activo], [creado_en]) VALUES (22, 11, N'E87459969', 10, 7, 1, CAST(N'2025-06-09T12:59:32.8533333' AS DateTime2))
SET IDENTITY_INSERT [dbo].[estudiantes] OFF
GO
SET IDENTITY_INSERT [dbo].[inscripciones] ON 

INSERT [dbo].[inscripciones] ([id], [estudiante_id], [materia_profesor_id], [fecha_inscripcion], [estado], [calificacion]) VALUES (18, 19, 35, CAST(N'2025-06-08T01:31:23.1566667' AS DateTime2), N'inactivo', NULL)
INSERT [dbo].[inscripciones] ([id], [estudiante_id], [materia_profesor_id], [fecha_inscripcion], [estado], [calificacion]) VALUES (19, 19, 34, CAST(N'2025-06-08T01:31:23.2900000' AS DateTime2), N'activo', NULL)
INSERT [dbo].[inscripciones] ([id], [estudiante_id], [materia_profesor_id], [fecha_inscripcion], [estado], [calificacion]) VALUES (20, 19, 36, CAST(N'2025-06-08T01:31:23.4266667' AS DateTime2), N'inactivo', NULL)
INSERT [dbo].[inscripciones] ([id], [estudiante_id], [materia_profesor_id], [fecha_inscripcion], [estado], [calificacion]) VALUES (21, 18, 36, CAST(N'2025-06-08T18:37:09.4866667' AS DateTime2), N'inactivo', NULL)
INSERT [dbo].[inscripciones] ([id], [estudiante_id], [materia_profesor_id], [fecha_inscripcion], [estado], [calificacion]) VALUES (22, 18, 34, CAST(N'2025-06-08T19:56:47.0200000' AS DateTime2), N'activo', NULL)
INSERT [dbo].[inscripciones] ([id], [estudiante_id], [materia_profesor_id], [fecha_inscripcion], [estado], [calificacion]) VALUES (23, 18, 33, CAST(N'2025-06-08T17:26:33.4400000' AS DateTime2), N'inactivo', NULL)
INSERT [dbo].[inscripciones] ([id], [estudiante_id], [materia_profesor_id], [fecha_inscripcion], [estado], [calificacion]) VALUES (24, 18, 35, CAST(N'2025-06-08T19:56:46.5866667' AS DateTime2), N'activo', NULL)
INSERT [dbo].[inscripciones] ([id], [estudiante_id], [materia_profesor_id], [fecha_inscripcion], [estado], [calificacion]) VALUES (25, 21, 35, CAST(N'2025-06-08T17:26:07.1300000' AS DateTime2), N'activo', NULL)
INSERT [dbo].[inscripciones] ([id], [estudiante_id], [materia_profesor_id], [fecha_inscripcion], [estado], [calificacion]) VALUES (26, 21, 34, CAST(N'2025-06-08T17:26:07.3400000' AS DateTime2), N'activo', NULL)
INSERT [dbo].[inscripciones] ([id], [estudiante_id], [materia_profesor_id], [fecha_inscripcion], [estado], [calificacion]) VALUES (27, 21, 33, CAST(N'2025-06-08T17:26:07.5366667' AS DateTime2), N'activo', NULL)
INSERT [dbo].[inscripciones] ([id], [estudiante_id], [materia_profesor_id], [fecha_inscripcion], [estado], [calificacion]) VALUES (28, 21, 36, CAST(N'2025-06-08T17:21:30.8433333' AS DateTime2), N'inactivo', NULL)
INSERT [dbo].[inscripciones] ([id], [estudiante_id], [materia_profesor_id], [fecha_inscripcion], [estado], [calificacion]) VALUES (29, 18, 43, CAST(N'2025-06-08T19:56:46.7866667' AS DateTime2), N'inactivo', NULL)
INSERT [dbo].[inscripciones] ([id], [estudiante_id], [materia_profesor_id], [fecha_inscripcion], [estado], [calificacion]) VALUES (30, 22, 45, CAST(N'2025-06-09T13:00:27.7633333' AS DateTime2), N'activo', NULL)
INSERT [dbo].[inscripciones] ([id], [estudiante_id], [materia_profesor_id], [fecha_inscripcion], [estado], [calificacion]) VALUES (31, 18, 45, CAST(N'2025-06-09T21:40:00.3666667' AS DateTime2), N'activo', NULL)
SET IDENTITY_INSERT [dbo].[inscripciones] OFF
GO
SET IDENTITY_INSERT [dbo].[materias] ON 

INSERT [dbo].[materias] ([id], [codigo], [nombre], [descripcion], [creditos], [cupo_maximo], [activa], [creado_en], [cupo_disponible]) VALUES (19, N'INGLES I', N'INGLES I', N'Ingles general para estudiantes', 3, 10, 1, CAST(N'2025-06-08T01:13:54.6966667' AS DateTime2), 9)
INSERT [dbo].[materias] ([id], [codigo], [nombre], [descripcion], [creditos], [cupo_maximo], [activa], [creado_en], [cupo_disponible]) VALUES (20, N'INGLES2', N'INGLES 2', N'Ingles general 2', 3, 10, 1, CAST(N'2025-06-08T01:14:50.6633333' AS DateTime2), 10)
INSERT [dbo].[materias] ([id], [codigo], [nombre], [descripcion], [creditos], [cupo_maximo], [activa], [creado_en], [cupo_disponible]) VALUES (21, N'MAT101', N'MATEMATICAS', N'Iniciación al algebra de valdor', 3, 15, 1, CAST(N'2025-06-08T01:18:22.3666667' AS DateTime2), 13)
INSERT [dbo].[materias] ([id], [codigo], [nombre], [descripcion], [creditos], [cupo_maximo], [activa], [creado_en], [cupo_disponible]) VALUES (22, N'ECU1', N'ECUACIONES DIFERENCIALES', N'Continuación matematicas segundo semestre ', 5, 18, 1, CAST(N'2025-06-08T01:19:01.5600000' AS DateTime2), 18)
INSERT [dbo].[materias] ([id], [codigo], [nombre], [descripcion], [creditos], [cupo_maximo], [activa], [creado_en], [cupo_disponible]) VALUES (23, N'FIS I', N'FISICA I', N'Introducción a la fisica y materia del universor', 3, 5, 1, CAST(N'2025-06-08T01:19:39.5533333' AS DateTime2), 2)
INSERT [dbo].[materias] ([id], [codigo], [nombre], [descripcion], [creditos], [cupo_maximo], [activa], [creado_en], [cupo_disponible]) VALUES (24, N'NEG1', N'NEGOCIOS 1', N'Introducción al mercadeo y negocio', 3, 3, 1, CAST(N'2025-06-08T01:20:19.1066667' AS DateTime2), 3)
INSERT [dbo].[materias] ([id], [codigo], [nombre], [descripcion], [creditos], [cupo_maximo], [activa], [creado_en], [cupo_disponible]) VALUES (25, N'PRG1', N'PROGRAMACIÓN BASICA', N'Introducción a los conceptos web, HTML, CSS, JS', 3, 20, 1, CAST(N'2025-06-08T01:21:03.4400000' AS DateTime2), 20)
INSERT [dbo].[materias] ([id], [codigo], [nombre], [descripcion], [creditos], [cupo_maximo], [activa], [creado_en], [cupo_disponible]) VALUES (26, N'ART I', N'ARTES I', N'Principios y descubrimientos del arte contemporaneo', 3, 15, 1, CAST(N'2025-06-08T01:21:51.4733333' AS DateTime2), 13)
INSERT [dbo].[materias] ([id], [codigo], [nombre], [descripcion], [creditos], [cupo_maximo], [activa], [creado_en], [cupo_disponible]) VALUES (27, N'NEG2', N'NEGOCIOS 2', N'', 3, 15, 1, CAST(N'2025-06-08T01:22:21.0333333' AS DateTime2), 15)
INSERT [dbo].[materias] ([id], [codigo], [nombre], [descripcion], [creditos], [cupo_maximo], [activa], [creado_en], [cupo_disponible]) VALUES (28, N'ESTD3', N'ESTADISTICA 3', N'Histogramas, diagramas, etc', 3, 15, 1, CAST(N'2025-06-08T01:22:45.7233333' AS DateTime2), 15)
INSERT [dbo].[materias] ([id], [codigo], [nombre], [descripcion], [creditos], [cupo_maximo], [activa], [creado_en], [cupo_disponible]) VALUES (29, N'asdasd', N'asdasdas', N'asdasdas', 3, 3, 1, CAST(N'2025-06-08T19:18:00.4333333' AS DateTime2), 3)
SET IDENTITY_INSERT [dbo].[materias] OFF
GO
SET IDENTITY_INSERT [dbo].[materias_profesores] ON 

INSERT [dbo].[materias_profesores] ([id], [materia_id], [profesor_id], [grupo], [horario], [activo]) VALUES (33, 19, 15, N'A', N'Martes 6:00 PM - 8:00 PM', 1)
INSERT [dbo].[materias_profesores] ([id], [materia_id], [profesor_id], [grupo], [horario], [activo]) VALUES (34, 23, 15, N'A', N'Viernes 6:00 PM - 8:00 PM', 1)
INSERT [dbo].[materias_profesores] ([id], [materia_id], [profesor_id], [grupo], [horario], [activo]) VALUES (35, 26, 16, N'C', N'Martes 8:00 PM - 10:00 PM', 1)
INSERT [dbo].[materias_profesores] ([id], [materia_id], [profesor_id], [grupo], [horario], [activo]) VALUES (36, 25, 16, N'C', N'Miercoles 6:00 PM - 8:00 PM', 1)
INSERT [dbo].[materias_profesores] ([id], [materia_id], [profesor_id], [grupo], [horario], [activo]) VALUES (43, 29, 18, N'A', N'Lunes 6:00 PM - 8:00 PM', 1)
INSERT [dbo].[materias_profesores] ([id], [materia_id], [profesor_id], [grupo], [horario], [activo]) VALUES (44, 24, 18, N'A', N'Miercoles 6:00 PM - 8:00 PM', 1)
INSERT [dbo].[materias_profesores] ([id], [materia_id], [profesor_id], [grupo], [horario], [activo]) VALUES (45, 21, 19, N'B', N'Lunes 8:00 PM - 10:00 PM', 1)
SET IDENTITY_INSERT [dbo].[materias_profesores] OFF
GO
SET IDENTITY_INSERT [dbo].[profesores] ON 

INSERT [dbo].[profesores] ([id], [usuario_id], [especialidad], [activo], [creado_en]) VALUES (15, 2, NULL, 1, CAST(N'2025-06-08T01:24:28.5800000' AS DateTime2))
INSERT [dbo].[profesores] ([id], [usuario_id], [especialidad], [activo], [creado_en]) VALUES (16, 5, NULL, 1, CAST(N'2025-06-08T01:27:04.8066667' AS DateTime2))
INSERT [dbo].[profesores] ([id], [usuario_id], [especialidad], [activo], [creado_en]) VALUES (17, 6, NULL, 1, CAST(N'2025-06-08T16:36:08.6066667' AS DateTime2))
INSERT [dbo].[profesores] ([id], [usuario_id], [especialidad], [activo], [creado_en]) VALUES (18, 9, NULL, 1, CAST(N'2025-06-08T19:03:21.3466667' AS DateTime2))
INSERT [dbo].[profesores] ([id], [usuario_id], [especialidad], [activo], [creado_en]) VALUES (19, 10, NULL, 1, CAST(N'2025-06-09T12:58:15.5200000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[profesores] OFF
GO
SET IDENTITY_INSERT [dbo].[roles] ON 

INSERT [dbo].[roles] ([id], [nombre], [descripcion], [creado_en]) VALUES (1, N'Estudiante', N'Rol para estudiantes que pueden inscribir materias', CAST(N'2025-06-04T13:41:52.2000000' AS DateTime2))
INSERT [dbo].[roles] ([id], [nombre], [descripcion], [creado_en]) VALUES (2, N'Profesor', N'Rol para profesores que imparten materias', CAST(N'2025-06-04T13:41:54.8566667' AS DateTime2))
INSERT [dbo].[roles] ([id], [nombre], [descripcion], [creado_en]) VALUES (3, N'Administrador', N'Rol que puede crear material nuevas', CAST(N'2025-06-05T18:06:10.4500000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[roles] OFF
GO
SET IDENTITY_INSERT [dbo].[usuarios] ON 

INSERT [dbo].[usuarios] ([id], [nombre], [email], [password_hash], [rol_id], [activo], [creado_en], [actualizado_en]) VALUES (1, N'Admin', N'admin@admin.com', N'$2a$12$XaKhILnNxc8uArj1qor.ree24C5Z7jt8qFVJSjoJaAA5BnaA5APve', 3, 1, CAST(N'2025-06-05T18:10:48.3866667' AS DateTime2), CAST(N'2025-06-05T18:10:48.3866667' AS DateTime2))
INSERT [dbo].[usuarios] ([id], [nombre], [email], [password_hash], [rol_id], [activo], [creado_en], [actualizado_en]) VALUES (2, N'Martin Narvaez Pedraza', N'matin56s5@gmail.com', N'$2a$12$b08QGZoTkVhelIUj0PrFMO3uEyjpqPqRz8O9Td6eCBYHnB3suo3t.', 2, 1, CAST(N'2025-06-08T01:24:28.5800000' AS DateTime2), CAST(N'2025-06-08T01:24:28.5800000' AS DateTime2))
INSERT [dbo].[usuarios] ([id], [nombre], [email], [password_hash], [rol_id], [activo], [creado_en], [actualizado_en]) VALUES (3, N'Jeyfred Calderon cortes', N'jeyfredc@gmail.com', N'$2a$12$s.nvsT.wdIH.6NHr4ll4zu4Bmxxzj0W5av.9m7sUt0dZhhzpuTbM6', 1, 1, CAST(N'2025-06-08T01:24:43.1600000' AS DateTime2), CAST(N'2025-06-08T01:24:43.1600000' AS DateTime2))
INSERT [dbo].[usuarios] ([id], [nombre], [email], [password_hash], [rol_id], [activo], [creado_en], [actualizado_en]) VALUES (4, N'Yehison Reyes Rodriguez', N'jelodare@outlook.com', N'$2a$12$Qavj3cVJJ24NsbEIr2IQy.mJCZQOqfHCV3Tqy1y73lscsBlG0yXVm', 1, 1, CAST(N'2025-06-08T01:25:19.8733333' AS DateTime2), CAST(N'2025-06-08T01:25:19.8733333' AS DateTime2))
INSERT [dbo].[usuarios] ([id], [nombre], [email], [password_hash], [rol_id], [activo], [creado_en], [actualizado_en]) VALUES (5, N'Didier Escobar', N'didier@gmail.com', N'$2a$12$XOS/NNFJTTqZQAnk1ROqU.hrTYETiNQIxEjUpwyxSDNVDqT0D/xXi', 2, 1, CAST(N'2025-06-08T01:27:04.8066667' AS DateTime2), CAST(N'2025-06-08T01:27:04.8066667' AS DateTime2))
INSERT [dbo].[usuarios] ([id], [nombre], [email], [password_hash], [rol_id], [activo], [creado_en], [actualizado_en]) VALUES (6, N'javier macias', N'javierm@gmail.com', N'$2a$12$7NPCfPuo2o3o.E.I6lwSJ.J.qhVBEpQDLZFsNUono8Lw/fib8HOHa', 2, 1, CAST(N'2025-06-08T16:36:08.6066667' AS DateTime2), CAST(N'2025-06-08T16:36:08.6066667' AS DateTime2))
INSERT [dbo].[usuarios] ([id], [nombre], [email], [password_hash], [rol_id], [activo], [creado_en], [actualizado_en]) VALUES (7, N'carlos calderon', N'carlosc@gmail.com', N'$2a$12$oCiFi4TPsX6PkNvl7C9bpuOCzf2CYyIxxtvnPSX/Sj1jmMGE8NEI6', 1, 1, CAST(N'2025-06-08T16:38:17.6833333' AS DateTime2), CAST(N'2025-06-08T16:38:17.6833333' AS DateTime2))
INSERT [dbo].[usuarios] ([id], [nombre], [email], [password_hash], [rol_id], [activo], [creado_en], [actualizado_en]) VALUES (8, N'marcela contreras', N'marcelac@gmail.com', N'$2a$12$HJjWrvVxVwd68FSoJFoRdOENRcWi5inKXflYUx/SgET30tcqOWnku', 1, 1, CAST(N'2025-06-08T16:40:41.5400000' AS DateTime2), CAST(N'2025-06-08T16:40:41.5400000' AS DateTime2))
INSERT [dbo].[usuarios] ([id], [nombre], [email], [password_hash], [rol_id], [activo], [creado_en], [actualizado_en]) VALUES (9, N'Maria calderon', N'mariac@gmail.com', N'$2a$12$4AGTjp9zRxVbOYbWY6RiBOXZcdyrieqtc8T.HVDxG/WwjJ7dXZAna', 2, 1, CAST(N'2025-06-08T19:03:21.3466667' AS DateTime2), CAST(N'2025-06-08T19:03:21.3466667' AS DateTime2))
INSERT [dbo].[usuarios] ([id], [nombre], [email], [password_hash], [rol_id], [activo], [creado_en], [actualizado_en]) VALUES (10, N'John Rodriguez', N'john@gmail.com', N'$2a$12$B18NI.EtyT.G67NPwYr4CuoWXDRbOBF.XQuxzcv9/oYNLXlM5U0yG', 2, 1, CAST(N'2025-06-09T12:58:15.5200000' AS DateTime2), CAST(N'2025-06-09T12:58:15.5200000' AS DateTime2))
INSERT [dbo].[usuarios] ([id], [nombre], [email], [password_hash], [rol_id], [activo], [creado_en], [actualizado_en]) VALUES (11, N'John Rodriguez', N'Joero@gmail.com', N'$2a$12$.6j5cjuVHn6nJPHTEo0eVeo//yMNtE1JDr3l67ZONnJoa2o7v.Qzy', 1, 1, CAST(N'2025-06-09T12:59:32.8533333' AS DateTime2), CAST(N'2025-06-09T12:59:32.8533333' AS DateTime2))
SET IDENTITY_INSERT [dbo].[usuarios] OFF
GO
/****** Object:  Index [UQ__estudian__2ED7D2AED886A7D7]    Script Date: 12/06/2025 9:44:00 a. m. ******/
ALTER TABLE [dbo].[estudiantes] ADD UNIQUE NONCLUSTERED 
(
	[usuario_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__estudian__30962D15A24B68EE]    Script Date: 12/06/2025 9:44:00 a. m. ******/
ALTER TABLE [dbo].[estudiantes] ADD UNIQUE NONCLUSTERED 
(
	[matricula] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ_estudiante_materia]    Script Date: 12/06/2025 9:44:00 a. m. ******/
ALTER TABLE [dbo].[inscripciones] ADD  CONSTRAINT [UQ_estudiante_materia] UNIQUE NONCLUSTERED 
(
	[estudiante_id] ASC,
	[materia_profesor_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__materias__40F9A206268D1F66]    Script Date: 12/06/2025 9:44:00 a. m. ******/
ALTER TABLE [dbo].[materias] ADD UNIQUE NONCLUSTERED 
(
	[codigo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ_materia_profesor_grupo]    Script Date: 12/06/2025 9:44:00 a. m. ******/
ALTER TABLE [dbo].[materias_profesores] ADD  CONSTRAINT [UQ_materia_profesor_grupo] UNIQUE NONCLUSTERED 
(
	[materia_id] ASC,
	[profesor_id] ASC,
	[grupo] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__profesor__2ED7D2AE0C6E3465]    Script Date: 12/06/2025 9:44:00 a. m. ******/
ALTER TABLE [dbo].[profesores] ADD UNIQUE NONCLUSTERED 
(
	[usuario_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__roles__72AFBCC6C059C877]    Script Date: 12/06/2025 9:44:00 a. m. ******/
ALTER TABLE [dbo].[roles] ADD UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__usuarios__AB6E616486586134]    Script Date: 12/06/2025 9:44:00 a. m. ******/
ALTER TABLE [dbo].[usuarios] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[estudiantes] ADD  DEFAULT ((9)) FOR [creditos_totales]
GO
ALTER TABLE [dbo].[estudiantes] ADD  DEFAULT ((9)) FOR [creditos_disponibles]
GO
ALTER TABLE [dbo].[estudiantes] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[estudiantes] ADD  DEFAULT (getdate()) FOR [creado_en]
GO
ALTER TABLE [dbo].[inscripciones] ADD  DEFAULT (getdate()) FOR [fecha_inscripcion]
GO
ALTER TABLE [dbo].[inscripciones] ADD  DEFAULT ('activo') FOR [estado]
GO
ALTER TABLE [dbo].[materias] ADD  DEFAULT ((3)) FOR [creditos]
GO
ALTER TABLE [dbo].[materias] ADD  DEFAULT ((30)) FOR [cupo_maximo]
GO
ALTER TABLE [dbo].[materias] ADD  DEFAULT ((1)) FOR [activa]
GO
ALTER TABLE [dbo].[materias] ADD  DEFAULT (getdate()) FOR [creado_en]
GO
ALTER TABLE [dbo].[materias] ADD  CONSTRAINT [DF_materias_cupo_disponible]  DEFAULT ((30)) FOR [cupo_disponible]
GO
ALTER TABLE [dbo].[materias_profesores] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[profesores] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[profesores] ADD  DEFAULT (getdate()) FOR [creado_en]
GO
ALTER TABLE [dbo].[roles] ADD  DEFAULT (getdate()) FOR [creado_en]
GO
ALTER TABLE [dbo].[usuarios] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[usuarios] ADD  DEFAULT (getdate()) FOR [creado_en]
GO
ALTER TABLE [dbo].[usuarios] ADD  DEFAULT (getdate()) FOR [actualizado_en]
GO
ALTER TABLE [dbo].[estudiantes]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[inscripciones]  WITH CHECK ADD FOREIGN KEY([estudiante_id])
REFERENCES [dbo].[estudiantes] ([id])
GO
ALTER TABLE [dbo].[inscripciones]  WITH CHECK ADD FOREIGN KEY([materia_profesor_id])
REFERENCES [dbo].[materias_profesores] ([id])
GO
ALTER TABLE [dbo].[materias_profesores]  WITH CHECK ADD FOREIGN KEY([materia_id])
REFERENCES [dbo].[materias] ([id])
GO
ALTER TABLE [dbo].[materias_profesores]  WITH CHECK ADD FOREIGN KEY([profesor_id])
REFERENCES [dbo].[profesores] ([id])
GO
ALTER TABLE [dbo].[profesores]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD FOREIGN KEY([rol_id])
REFERENCES [dbo].[roles] ([id])
GO
/****** Object:  StoredProcedure [dbo].[sp_ActualizarMateria]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_ActualizarMateria]
    @MateriaId INT,
    @NuevoCodigo VARCHAR(20),
    @NuevoNombre VARCHAR(100),
    @NuevaDescripcion VARCHAR(500),
    @NuevosCreditos INT,
    @NuevoCupoMaximo INT,
    @NuevosHorarios NVARCHAR(MAX) -- Formato: [{"dia": "Lunes", "horaInicio": "18:00", "horaFin": "20:00"}]
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @Resultado BIT = 0;
    DECLARE @Mensaje VARCHAR(500) = '';
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        UPDATE materias
        SET 
            codigo = @NuevoCodigo,
            nombre = @NuevoNombre,
            descripcion = @NuevaDescripcion,
            creditos = @NuevosCreditos,
            cupo_maximo = @NuevoCupoMaximo,
            cupo_disponible = @NuevoCupoMaximo
        WHERE id = @MateriaId;

        UPDATE materias_profesores
        SET 
            horario = @NuevosHorarios
        WHERE materia_id = @MateriaId;
        
        SET @Resultado = 1;
        SET @Mensaje = 'Materia y horarios actualizados exitosamente';
        
        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;
            
        SET @Resultado = 0;
        SET @Mensaje = ERROR_MESSAGE();
        
        -- Si es un error de validación conocido, lo devolvemos directamente
        IF ERROR_NUMBER() BETWEEN 50001 AND 50004
        BEGIN
            SELECT @Resultado AS Resultado, @Mensaje AS Mensaje;
            RETURN;
        END
        
        -- Para otros errores, registramos el error y devolvemos un mensaje genérico
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        
        SET @Mensaje = 'Error al actualizar la materia. Por favor, intente nuevamente.';
        

    END CATCH
    
    -- Devolver el resultado
    SELECT @Resultado AS Resultado, @Mensaje AS Mensaje;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_AsignarMateriaProfesor]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_AsignarMateriaProfesor]
    @ProfesorId INT,
    @CodigoMateria VARCHAR(20),
    @Horario VARCHAR(50), -- Formato: "Día HH:MM-HH:MM" (ej: "Lunes 8:00-10:00")
    @Grupo VARCHAR(10) = 'G1' -- Grupo por defecto
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @MateriaId INT;
    DECLARE @Resultado BIT = 0;
    DECLARE @Mensaje VARCHAR(500) = '';
    DECLARE @ExisteAsignacion BIT = 0;
    DECLARE @MateriasAsignadas INT = 0;
    DECLARE @MaxMateriasPermitidas INT = 2;
    
    BEGIN TRY
        -- Verificar que el profesor existe
        IF NOT EXISTS (SELECT 1 FROM profesores WHERE id = @ProfesorId)
        BEGIN
            SET @Mensaje = 'El profesor especificado no existe';
            SELECT @Resultado AS Resultado, @Mensaje AS Mensaje, @MaxMateriasPermitidas AS MaxMateriasPermitidas;
            RETURN;
        END
        
        -- Obtener el ID de la materia
        SELECT @MateriaId = id 
        FROM materias 
        WHERE codigo = @CodigoMateria;
        
        IF @MateriaId IS NULL
        BEGIN
            SET @Mensaje = 'La materia especificada no existe';
            SELECT @Resultado AS Resultado, @Mensaje AS Mensaje, @MaxMateriasPermitidas AS MaxMateriasPermitidas;
            RETURN;
        END
        
        -- Verificar si ya existe una asignación similar
        SELECT @ExisteAsignacion = 1
        FROM materias_profesores mp
        WHERE mp.profesor_id = @ProfesorId
        AND mp.materia_id = @MateriaId
        AND mp.activo = 1;
        
        IF @ExisteAsignacion = 1
        BEGIN
            SET @Mensaje = 'El profesor ya tiene asignada esta materia';
            SELECT @Resultado AS Resultado, @Mensaje AS Mensaje, @MaxMateriasPermitidas AS MaxMateriasPermitidas;
            RETURN;
        END
        
        -- Verificar que el profesor no tenga ya el máximo de materias asignadas
        SELECT @MateriasAsignadas = COUNT(*)
        FROM materias_profesores
        WHERE profesor_id = @ProfesorId
        AND activo = 1;
        
        IF @MateriasAsignadas >= @MaxMateriasPermitidas
        BEGIN
            SET @Mensaje = 'El profesor ya tiene asignado el máximo de ' + 
                          CAST(@MaxMateriasPermitidas AS VARCHAR(10)) + 
                          ' materias permitidas';
            SELECT @Resultado AS Resultado, @Mensaje AS Mensaje, @MaxMateriasPermitidas AS MaxMateriasPermitidas;
            RETURN;
        END
        
        -- Verificar que no haya conflicto de horario
        IF EXISTS (
            SELECT 1 
            FROM materias_profesores
            WHERE profesor_id = @ProfesorId
            AND activo = 1
            AND CONVERT(VARCHAR(50), horario) = @Horario
        )
        BEGIN
            SET @Mensaje = 'El profesor ya tiene una materia asignada en ese horario';
            SELECT @Resultado AS Resultado, @Mensaje AS Mensaje, @MaxMateriasPermitidas AS MaxMateriasPermitidas;
            RETURN;
        END
        
        BEGIN TRANSACTION;
        
        -- Insertar la nueva asignación
        INSERT INTO materias_profesores (
            profesor_id,
            materia_id,
            grupo,
            horario,
            activo
        ) VALUES (
            @ProfesorId,
            @MateriaId,
            @Grupo,
            @Horario,
            1 -- activo
        );
        
        -- Actualizar el estado de la materia si es necesario
        UPDATE m
        SET activa = 1
        FROM materias m
        WHERE m.id = @MateriaId;
        
        SET @Resultado = 1;
        SET @Mensaje = 'Materia asignada al profesor exitosamente';
        
        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;
            
        SET @Mensaje = 'Error al asignar la materia: ' + ERROR_MESSAGE();
    END CATCH
    
    -- Siempre retornar el resultado
    SELECT 
        @Resultado AS Resultado,
        @Mensaje AS Mensaje,
        @MaxMateriasPermitidas AS MaxMateriasPermitidas;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_CrearMateria]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_CrearMateria]
    @Codigo VARCHAR(20),
    @Nombre VARCHAR(100),
    @Descripcion VARCHAR(500),
    @Creditos INT,
    @Cupo_Maximo INT,
    @Activa BIT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Verificar si ya existe una materia con el mismo código
        IF EXISTS (SELECT 1 FROM materias WHERE codigo = @Codigo)
        BEGIN
            ROLLBACK;
            RETURN -1; -- Código de error para materia ya existente
        END
        
        -- Insertar la nueva materia
        INSERT INTO materias (
            codigo,
            nombre,
            descripcion,
            creditos,
            cupo_maximo,
            activa,
            creado_en,
            cupo_disponible
        ) VALUES (
            @Codigo,
            @Nombre,
            @Descripcion,
            @Creditos,
            @Cupo_Maximo,
            @Activa,
            GETDATE(), -- Fecha y hora actual
            @Cupo_Maximo -- Inicialmente el cupo disponible es igual al cupo máximo
        );
        
        -- Devolver el ID de la materia recién creada
        SELECT SCOPE_IDENTITY() AS MateriaId;
        
        COMMIT;
        RETURN 1; -- Éxito
    END TRY
    BEGIN CATCH
        ROLLBACK;
        -- Registrar el error
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
        RETURN -2; -- Código de error general
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_DesmatricularMateria]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_DesmatricularMateria]
    @estudianteId INT,  -- Recibimos directamente el ID del estudiante
    @codigoMateria VARCHAR(20),
    @resultado BIT OUTPUT,
    @mensaje VARCHAR(500) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @creditosADevolver INT = 3; -- Mismo valor que se resta al matricular
    DECLARE @materiaId INT;
    DECLARE @materiaProfesorId INT;
    DECLARE @inscripcionId INT;
    
    -- Verificar si el estudiante existe
    IF NOT EXISTS (SELECT 1 FROM estudiantes WHERE id = @estudianteId)
    BEGIN
        SET @resultado = 0;
        SET @mensaje = 'El estudiante especificado no existe.';
        RETURN;
    END
    
    -- Obtener el ID de la materia
    SELECT @materiaId = id 
    FROM materias 
    WHERE codigo = @codigoMateria;
    
    IF @materiaId IS NULL
    BEGIN
        SET @resultado = 0;
        SET @mensaje = 'Código de materia no válido.';
        RETURN;
    END
    
    -- Obtener la inscripción activa del estudiante para esta materia
    SELECT 
        @inscripcionId = i.id,
        @materiaProfesorId = i.materia_profesor_id
    FROM inscripciones i
    INNER JOIN materias_profesores mp ON i.materia_profesor_id = mp.id
    WHERE i.estudiante_id = @estudianteId
    AND mp.materia_id = @materiaId
    AND i.estado = 'activo';
    
    -- Verificar si existe una inscripción activa
    IF @inscripcionId IS NULL
    BEGIN
        SET @resultado = 0;
        SET @mensaje = 'No estás inscrito en esta materia o ya fue dada de baja.';
        RETURN;
    END
    
    -- Iniciar transacción para asegurar la integridad de los datos
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- 1. Dar de baja la inscripción
        UPDATE inscripciones
        SET estado = 'inactivo'
        WHERE id = @inscripcionId;
        
        -- 2. Devolver los créditos al estudiante
        UPDATE estudiantes
        SET creditos_disponibles = creditos_disponibles + @creditosADevolver
        WHERE id = @estudianteId;
        
        -- 3. Incrementar el contador de cupos disponibles en la materia
        UPDATE m
        SET cupo_disponible = ISNULL(cupo_disponible, 0) + 1
        FROM materias m
        INNER JOIN materias_profesores mp ON m.id = mp.materia_id
        WHERE mp.id = @materiaProfesorId;
        
        COMMIT;
        
        SET @resultado = 1;
        SET @mensaje = 'Materia dada de baja exitosamente. Se han devuelto ' + CAST(@creditosADevolver AS VARCHAR) + ' créditos.';
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;
            
        SET @resultado = 0;
        SET @mensaje = 'Error al dar de baja la materia: ' + ERROR_MESSAGE();
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_EliminarAsignacionMateriaProfesor]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_EliminarAsignacionMateriaProfesor]
    @ProfesorId INT,
    @CodigoMateria VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @MateriaId INT;
    DECLARE @Resultado BIT = 0;
    DECLARE @Mensaje VARCHAR(500) = '';
    DECLARE @AsignacionId INT;
    DECLARE @CupoDisponible INT;
    DECLARE @CupoMaximo INT;
    DECLARE @EstudiantesInscritos INT = 0;
    
    -- Obtener el ID de la materia
    SELECT @MateriaId = id 
    FROM materias 
    WHERE codigo = @CodigoMateria;
    
    IF @MateriaId IS NULL
    BEGIN
        SELECT 
            0 AS Resultado,
            'La materia especificada no existe' AS Mensaje;
        RETURN;
    END
    
    -- Obtener la asignación
    SELECT 
        @AsignacionId = mp.id,
        @CupoDisponible = m.cupo_disponible,
        @CupoMaximo = m.cupo_maximo
    FROM materias_profesores mp
    INNER JOIN materias m ON mp.materia_id = m.id
    WHERE mp.profesor_id = @ProfesorId
    AND mp.materia_id = @MateriaId;
    
    IF @AsignacionId IS NULL
    BEGIN
        SELECT 
            0 AS Resultado,
            'No existe una asignación para este profesor y materia' AS Mensaje;
        RETURN;
    END
    
    -- Verificar si hay estudiantes inscritos
    SELECT @EstudiantesInscritos = COUNT(*)
    FROM inscripciones
    WHERE materia_profesor_id = @AsignacionId;
    
    -- Verificar condiciones para eliminar
    IF @EstudiantesInscritos > 0
    BEGIN
        SELECT 
            0 AS Resultado,
            'No se puede eliminar la asignación porque hay ' + 
            CAST(@EstudiantesInscritos AS VARCHAR(10)) + 
            ' estudiante(s) inscrito(s) en esta materia' AS Mensaje;
        RETURN;
    END
    
    IF @CupoDisponible <> @CupoMaximo
    BEGIN
        SELECT 
            0 AS Resultado,
            'No se puede eliminar la asignación porque el cupo disponible (' + 
            CAST(@CupoDisponible AS VARCHAR(10)) + 
            ') no coincide con el cupo máximo (' + 
            CAST(@CupoMaximo AS VARCHAR(10)) + ')' AS Mensaje;
        RETURN;
    END
    
    -- Si llegamos aquí, procedemos a eliminar
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Eliminar la asignación
        DELETE FROM materias_profesores
        WHERE id = @AsignacionId;
        
        SET @Resultado = 1;
        SET @Mensaje = 'Se desasigno el profesor exitosamente';
        
        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;
            
        SELECT 
            0 AS Resultado,
            'Error al eliminar la asignación: ' + ERROR_MESSAGE() AS Mensaje;
        RETURN;
    END CATCH
    
    -- Retornar éxito
    SELECT 
        @Resultado AS Resultado,
        @Mensaje AS Mensaje;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_EliminarMateria]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_EliminarMateria]
    @CodigoMateria VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @MateriaId INT;
    DECLARE @Resultado BIT = 0;
    DECLARE @Mensaje VARCHAR(500) = '';
    DECLARE @CupoDisponible INT;
    DECLARE @CupoMaximo INT;
    DECLARE @EstudiantesInscritos INT = 0;
    DECLARE @ProfesoresAsignados INT = 0;
    
    -- Obtener el ID de la materia
    SELECT 
        @MateriaId = id,
        @CupoDisponible = cupo_disponible,
        @CupoMaximo = cupo_maximo
    FROM materias 
    WHERE codigo = @CodigoMateria;
    
    -- Verificar si la materia existe
    IF @MateriaId IS NULL
    BEGIN
        SELECT 
            0 AS Resultado,
            'La materia especificada no existe' AS Mensaje;
        RETURN;
    END
    
    -- Verificar si hay estudiantes inscritos
    SELECT @EstudiantesInscritos = COUNT(*)
    FROM inscripciones i
    INNER JOIN materias_profesores mp ON i.materia_profesor_id = mp.id
    WHERE mp.materia_id = @MateriaId;
    
    -- Verificar si hay profesores asignados
    SELECT @ProfesoresAsignados = COUNT(*)
    FROM materias_profesores
    WHERE materia_id = @MateriaId;
    
    -- Validaciones
    IF @EstudiantesInscritos > 0
    BEGIN
        SELECT 
            0 AS Resultado,
            'No se puede eliminar la materia porque tiene ' + 
            CAST(@EstudiantesInscritos AS VARCHAR(10)) + 
            ' estudiante(s) inscrito(s)' AS Mensaje;
        RETURN;
    END
    
    IF @ProfesoresAsignados > 0
    BEGIN
        SELECT 
            0 AS Resultado,
            'No se puede eliminar la materia porque tiene ' + 
            CAST(@ProfesoresAsignados AS VARCHAR(10)) + 
            ' profesor(es) asignado(s)' AS Mensaje;
        RETURN;
    END
    
    IF @CupoDisponible <> @CupoMaximo
    BEGIN
        SELECT 
            0 AS Resultado,
            'No se puede eliminar la materia porque el cupo disponible (' + 
            CAST(@CupoDisponible AS VARCHAR(10)) + 
            ') no coincide con el cupo máximo (' + 
            CAST(@CupoMaximo AS VARCHAR(10)) + ')' AS Mensaje;
        RETURN;
    END
    
    -- Si llegamos aquí, procedemos a eliminar
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Primero eliminamos cualquier relación en materias_profesores (por si acaso)
        DELETE FROM materias_profesores
        WHERE materia_id = @MateriaId;
        
        -- Luego eliminamos la materia
        DELETE FROM materias
        WHERE id = @MateriaId;
        
        SET @Resultado = 1;
        SET @Mensaje = 'Materia eliminada exitosamente';
        
        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;
            
        SELECT 
            0 AS Resultado,
            'Error al eliminar la materia: ' + ERROR_MESSAGE() AS Mensaje;
        RETURN;
    END CATCH
    
    -- Retornar éxito
    SELECT 
        @Resultado AS Resultado,
        @Mensaje AS Mensaje;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_MatricularMateria]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_MatricularMateria]
    @usuarioId INT,
    @codigoMateria VARCHAR(20),
    @resultado BIT OUTPUT,
    @mensaje VARCHAR(500) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @estudianteId INT;
    DECLARE @creditosNecesarios INT = 3;
    DECLARE @creditosDisponibles INT;
    DECLARE @materiasInscritas INT;
    DECLARE @profesorId INT;
    DECLARE @materiaId INT;
    DECLARE @cuposDisponibles INT;
    DECLARE @materiaProfesorId INT;
    DECLARE @yaInscrito BIT = 0;
    
    -- Obtener el ID del estudiante
    SELECT @estudianteId = e.id
    FROM estudiantes e
    WHERE e.usuario_id = @usuarioId;
    
    -- Verificar si el estudiante existe
    IF @estudianteId IS NULL
    BEGIN
        SET @resultado = 0;
        SET @mensaje = 'No se encontró un estudiante asociado a este usuario.';
        RETURN;
    END
    
    -- Obtener información del estudiante
    SELECT 
        @creditosDisponibles = e.creditos_disponibles,
        @materiasInscritas = (
            SELECT COUNT(*) 
            FROM inscripciones i
            INNER JOIN materias_profesores mp ON i.materia_profesor_id = mp.id
            WHERE i.estudiante_id = @estudianteId 
            AND i.estado = 'activo'
        )
    FROM estudiantes e
    WHERE e.id = @estudianteId;
    
    -- Obtener el ID de la materia
    SELECT @materiaId = id 
    FROM materias 
    WHERE codigo = @codigoMateria;
    
    IF @materiaId IS NULL
    BEGIN
        SET @resultado = 0;
        SET @mensaje = 'Código de materia no válido.';
        RETURN;
    END
    
    -- Verificar si ya está inscrito en esta materia (activo o inactivo)
    IF EXISTS (
        SELECT 1 
        FROM inscripciones i
        INNER JOIN materias_profesores mp ON i.materia_profesor_id = mp.id
        WHERE i.estudiante_id = @estudianteId 
        AND mp.materia_id = @materiaId
    )
    BEGIN
        -- Verificar si ya está activo
        IF EXISTS (
            SELECT 1 
            FROM inscripciones i
            INNER JOIN materias_profesores mp ON i.materia_profesor_id = mp.id
            WHERE i.estudiante_id = @estudianteId 
            AND mp.materia_id = @materiaId
            AND i.estado = 'activo'
        )
        BEGIN
            SET @resultado = 0;
            SET @mensaje = 'Ya estás inscrito en esta materia.';
            RETURN;
        END
        ELSE
        BEGIN
            -- Si existe pero está inactivo, reactivar en lugar de crear nueva
            SELECT @materiaProfesorId = mp.id
            FROM materias_profesores mp
            WHERE mp.materia_id = @materiaId
            AND EXISTS (
                SELECT 1 
                FROM inscripciones i 
                WHERE i.estudiante_id = @estudianteId 
                AND i.materia_profesor_id = mp.id
            );
            
            SET @yaInscrito = 1;
        END
    END
    
    -- Si no hay registro previo, obtener la relación materia-profesor
    IF @materiaProfesorId IS NULL
    BEGIN
        SELECT TOP 1 
            @materiaProfesorId = mp.id,
            @profesorId = mp.profesor_id,
            @cuposDisponibles = m.cupo_disponible
        FROM materias_profesores mp
        INNER JOIN materias m ON mp.materia_id = m.id
        WHERE mp.materia_id = @materiaId
        AND m.cupo_disponible > 0
        ORDER BY mp.id;
    END
    
    IF @materiaProfesorId IS NULL
    BEGIN
        SET @resultado = 0;
        SET @mensaje = 'No hay cupos disponibles para esta materia o no hay profesores asignados.';
        RETURN;
    END
    
    -- Verificar límite de créditos
    IF @creditosDisponibles < @creditosNecesarios
    BEGIN
        SET @resultado = 0;
        SET @mensaje = 'No tienes suficientes créditos disponibles.';
        RETURN;
    END
    
    -- Verificar máximo de materias (3)
    IF @materiasInscritas >= 3
    BEGIN
        SET @resultado = 0;
        SET @mensaje = 'Solo puedes inscribirte a un máximo de 3 materias.';
        RETURN;
    END
    

    
    -- Todas las validaciones pasaron, proceder con la inscripción
    BEGIN TRY
        BEGIN TRANSACTION;
        
        IF @yaInscrito = 1
        BEGIN
            -- Reactivar inscripción existente
            UPDATE inscripciones
            SET estado = 'activo',
                fecha_inscripcion = GETDATE()
            WHERE estudiante_id = @estudianteId
            AND materia_profesor_id = @materiaProfesorId;
        END
        ELSE
        BEGIN
            -- Crear nueva inscripción
            INSERT INTO inscripciones (estudiante_id, materia_profesor_id, estado, fecha_inscripcion)
            VALUES (@estudianteId, @materiaProfesorId, 'activo', GETDATE());
        END
        
        -- Actualizar créditos disponibles del estudiante
        UPDATE estudiantes
        SET creditos_disponibles = creditos_disponibles - @creditosNecesarios
        WHERE id = @estudianteId;
        
        -- Reducir el contador de cupos disponibles en la materia
        UPDATE m
        SET cupo_disponible = cupo_disponible - 1
        FROM materias m
        INNER JOIN materias_profesores mp ON m.id = mp.materia_id
        WHERE mp.id = @materiaProfesorId;
        
        COMMIT;
        
        SET @resultado = 1;
        SET @mensaje = 'Inscripción ' + CASE WHEN @yaInscrito = 1 THEN 'reactivada' ELSE 'exitosa' END + '.';
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;
            
        SET @resultado = 0;
        SET @mensaje = 'Error al inscribir la materia: ' + ERROR_MESSAGE();
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerCompanerosClase]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_ObtenerCompanerosClase]
    @estudianteId INT,
    @codigoMateria VARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Obtener las materias en las que está inscrito el estudiante
    WITH MateriasEstudiante AS (
        SELECT DISTINCT mp.id AS materia_profesor_id,
               m.codigo AS codigo_materia
        FROM inscripciones i
        INNER JOIN materias_profesores mp ON i.materia_profesor_id = mp.id
        INNER JOIN materias m ON mp.materia_id = m.id
        WHERE i.estudiante_id = @estudianteId
        AND i.estado = 'activo'
        AND (@codigoMateria IS NULL OR m.codigo = @codigoMateria)
    )
    
    -- Obtener los compañeros de cada materia
    SELECT 
        m.codigo AS CodigoMateria,
        m.nombre AS Materia,
        u.nombre AS NombreEstudiante,
        u.email AS Email,
        e.matricula as Matricula
    FROM inscripciones i
    INNER JOIN materias_profesores mp ON i.materia_profesor_id = mp.id
    INNER JOIN materias m ON mp.materia_id = m.id
    INNER JOIN estudiantes e ON i.estudiante_id = e.id
    INNER JOIN usuarios u ON e.usuario_id = u.id
    WHERE i.estado = 'activo'
    AND i.estudiante_id != @estudianteId
    AND EXISTS (
        SELECT 1 
        FROM MateriasEstudiante me 
        WHERE me.materia_profesor_id = mp.id
    )
    ORDER BY m.nombre, u.nombre;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerCreditosEstudiante]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_ObtenerCreditosEstudiante]
    @usuarioId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        e.id AS EstudianteId,
        e.creditos_disponibles
    FROM estudiantes e
    WHERE e.usuario_id = @usuarioId;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerHorarioEstudiante]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_ObtenerHorarioEstudiante]
    @estudianteId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        m.codigo AS CodigoMateria,
        m.nombre AS Materia,
        u.nombre AS Profesor,
        mp.grupo,
        mp.horario,
        i.fecha_inscripcion AS FechaInscripcion
    FROM inscripciones i
    INNER JOIN materias_profesores mp ON i.materia_profesor_id = mp.id
    INNER JOIN materias m ON mp.materia_id = m.id
    INNER JOIN profesores p ON mp.profesor_id = p.id
    INNER JOIN usuarios u ON p.usuario_id = u.id
    WHERE i.estudiante_id = @estudianteId
    AND i.estado = 'activo'
    ORDER BY 
        CASE 
            WHEN mp.horario LIKE 'Lunes%' THEN 1
            WHEN mp.horario LIKE 'Martes%' THEN 2
            WHEN mp.horario LIKE 'Miércoles%' THEN 3
            WHEN mp.horario LIKE 'Jueves%' THEN 4
            WHEN mp.horario LIKE 'Viernes%' THEN 5
            ELSE 6
        END,
        -- Extrae solo la hora numérica del horario (ej: "Lunes 8:00-10:00" -> "8")
        CASE 
            WHEN ISNUMERIC(SUBSTRING(mp.horario, CHARINDEX(' ', mp.horario) + 1, 2)) = 1 
            THEN CAST(SUBSTRING(mp.horario, CHARINDEX(' ', mp.horario) + 1, 2) AS INT)
            ELSE 99  -- Valor por defecto alto para ordenar al final
        END;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerMateriasConEstadoAsignacion]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_ObtenerMateriasConEstadoAsignacion]
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Primero obtenemos las materias con su estado de asignación

    SELECT 
        m.id AS Id,
        m.Codigo,
        m.Nombre as Materia,
        m.Descripcion,
        m.Creditos,
        m.Cupo_Maximo,
        m.Cupo_Disponible,
        STUFF((
            SELECT ', ' + CAST(u.Nombre AS VARCHAR(100))
            FROM materias_profesores pm
            INNER JOIN Profesores p ON pm.profesor_id = p.id
            INNER JOIN Usuarios u ON p.usuario_id = u.id
            WHERE pm.materia_id = m.id
            FOR XML PATH('')
        ), 1, 2, '') AS Profesor_Asignado,
        STUFF((
            SELECT ', ' + CAST(p.id AS VARCHAR(10))  -- ID del profesor
            FROM materias_profesores pm
            INNER JOIN Profesores p ON pm.profesor_id = p.id
            WHERE pm.materia_id = m.id
            FOR XML PATH('')
        ), 1, 2, '') AS ProfesorId,
        STUFF((
            SELECT ', ' + CAST(pm.horario AS VARCHAR(50))
            FROM materias_profesores pm
            WHERE pm.materia_id = m.id
            FOR XML PATH('')
        ), 1, 2, '') AS Horarios
    FROM Materias m
    ORDER BY m.id;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerMateriasDisponibles]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_ObtenerMateriasDisponibles]
    @estudianteId INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Get available subjects that the student is not already enrolled in
    SELECT 
        m.codigo AS CodigoMateria,
        m.nombre AS Materia,
        m.creditos,
        u.nombre AS NombreProfesor,
        mp.horario,
        m.cupo_maximo AS CupoMaximo,
        m.cupo_disponible as CupoDisponible,
        p.id as ProfesorId
    FROM materias_profesores mp
    INNER JOIN materias m ON mp.materia_id = m.id
    INNER JOIN profesores p ON mp.profesor_id = p.id
    INNER JOIN usuarios u ON p.usuario_id = u.id
    WHERE mp.activo = 1
    AND m.activa = 1
    AND NOT EXISTS (
        SELECT 1 
        FROM inscripciones i 
        WHERE i.estudiante_id = @estudianteId 
        AND i.materia_profesor_id = mp.id
        AND i.estado = 'activo'
    )
    AND (SELECT COUNT(*) 
         FROM inscripciones i 
         WHERE i.materia_profesor_id = mp.id 
         AND i.estado = 'activo') < m.cupo_maximo
    ORDER BY m.nombre, u.nombre;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerMateriasNoAsignadas]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_ObtenerMateriasNoAsignadas]
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Listar materias que no están en la tabla materias_profesores
    SELECT 
        m.id,
        m.codigo,
        m.nombre,
        m.descripcion,
        m.creditos,
        m.cupo_maximo,
        m.activa,
        m.creado_en,
        m.cupo_disponible
    FROM 
        materias m
    LEFT JOIN 
        materias_profesores mp ON m.id = mp.materia_id
    WHERE 
        mp.id IS NULL  -- Solo materias sin asignar
        AND m.activa = 1  -- Opcional: solo materias activas
    ORDER BY 
        m.nombre;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerMateriasPorProfesor]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_ObtenerMateriasPorProfesor]
    @profesorId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validar que el profesor exista
        IF NOT EXISTS (SELECT 1 FROM profesores p 
                      INNER JOIN usuarios u ON p.usuario_id = u.id 
                      WHERE p.usuario_id = @profesorId)
        BEGIN
            RAISERROR('El profesor especificado no existe', 16, 1);
            RETURN;
        END

        -- Obtener materias que imparte el profesor
        SELECT 
            u.nombre AS NombreProfesor,
            mp.horario AS Horario, 
            m.cupo_maximo AS CupoMaximo, 
            m.cupo_disponible AS CupoDisponible,
            m.nombre AS NombreMateria,
            m.codigo AS CodigoMateria
        FROM usuarios u
        INNER JOIN profesores p ON u.id = p.usuario_id
        INNER JOIN materias_profesores mp ON p.id = mp.profesor_id
        INNER JOIN materias m ON mp.materia_id = m.id
        WHERE p.usuario_id = @profesorId

    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
        RETURN -1;
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[sp_ObtenerUsuarioCompletoPorEmail]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_ObtenerUsuarioCompletoPorEmail]
    @Email NVARCHAR(100)
AS
BEGIN
    -- 1. Obtener datos básicos del usuario con su rol
    SELECT 
        u.*,
        r.id as rol_id, 
        r.nombre as rol_nombre
    FROM usuarios u
    LEFT JOIN roles r ON u.rol_id = r.id
    WHERE u.email = @Email;

    -- 2. Obtener datos de estudiante si existe
    SELECT e.*
    FROM estudiantes e
    INNER JOIN usuarios u ON e.usuario_id = u.id
    WHERE u.email = @Email;

    -- 3. Obtener datos de profesor si existe
    SELECT p.*
    FROM profesores p
    INNER JOIN usuarios u ON p.usuario_id = u.id
    WHERE u.email = @Email;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_RegistrarUsuario]    Script Date: 12/06/2025 9:44:00 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[sp_RegistrarUsuario]
    @Nombre NVARCHAR(100),
    @Email NVARCHAR(255),
    @PasswordHash NVARCHAR(MAX),
    @RolId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Validar que el rol sea 1 (Estudiante) o 2 (Profesor)
        IF @RolId NOT IN (1, 2)
        BEGIN
            THROW 50001, 'El RolId debe ser 1 (Estudiante) o 2 (Profesor)', 1;
        END
        
        -- Verificar si el correo ya existe
        IF EXISTS (SELECT 1 FROM usuarios WHERE email = @Email)
        BEGIN
            THROW 50002, 'El correo electrónico ya está registrado', 1;
        END
        
        -- Insertar el nuevo usuario
        DECLARE @UsuarioId INT;
        DECLARE @FechaActual DATETIME = GETDATE();
        DECLARE @Matricula NVARCHAR(20) = NULL;
        
        INSERT INTO usuarios (
            nombre,
            email,
            password_hash,
            rol_id,
            activo,
            creado_en
        ) VALUES (
            @Nombre,
            @Email,
            @PasswordHash,
            @RolId,
            1, -- Activo por defecto
            @FechaActual
        );
        
        SET @UsuarioId = SCOPE_IDENTITY();
        
        -- Si es estudiante, generar matrícula y crear registro
        IF @RolId = 1
        BEGIN
            -- Generar matrícula única (E + 8 dígitos)
            DECLARE @Intentos INT = 0;
            DECLARE @MatriculaUnica BIT = 0;
            
            WHILE @MatriculaUnica = 0 AND @Intentos < 10
            BEGIN
                SET @Matricula = 'E' + RIGHT('00000000' + CAST(CAST(RAND() * 100000000 AS INT) AS VARCHAR(8)), 8);
                
                -- Verificar si la matrícula ya existe
                IF NOT EXISTS (SELECT 1 FROM estudiantes WHERE matricula = @Matricula)
                BEGIN
                    SET @MatriculaUnica = 1;
                END
                
                SET @Intentos = @Intentos + 1;
            END
            
            -- Si no se pudo generar una matrícula única después de 10 intentos
            IF @MatriculaUnica = 0
            BEGIN
                THROW 50005, 'No se pudo generar una matrícula única. Por favor, intente nuevamente.', 1;
            END
            
            -- Insertar en la tabla estudiantes
            INSERT INTO estudiantes (
                usuario_id,
                matricula,
                creditos_totales,
                creditos_disponibles,
                activo,
                creado_en
            ) VALUES (
                @UsuarioId,
                @Matricula,
                10,  -- Créditos totales
                10,  -- Créditos disponibles
                1,   -- Activo
                @FechaActual
            );
        END
           ELSE IF @RolId = 2
        BEGIN
            INSERT INTO profesores (
                usuario_id,
                activo,
                creado_en
            ) VALUES (
                @UsuarioId,
                1,   -- Activo
                @FechaActual
            );
        END
        -- Devolver los datos del usuario creado
        SELECT 
            u.id,
            u.nombre,
            u.email,
            e.matricula,           -- Solo para estudiantes
            e.creditos_totales    -- Solo para estudiantes
        FROM usuarios u
        LEFT JOIN estudiantes e ON u.id = e.usuario_id
        WHERE u.id = @UsuarioId;
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorNumber INT = ERROR_NUMBER();
        
        -- Personalizar mensajes de error
        IF @ErrorNumber = 50001 OR @ErrorNumber = 50002 OR @ErrorNumber = 50005
            THROW;
        ELSE
            THROW 50000, 'Error al registrar el usuario. Por favor, intente nuevamente.', 1;
    END CATCH
END
GO
ALTER DATABASE [MATERIAS] SET  READ_WRITE 
GO
