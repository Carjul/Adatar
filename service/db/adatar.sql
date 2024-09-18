-- Tabla: Facultades (no tiene claves foráneas)
CREATE TABLE IF NOT EXISTS public.Facultades (
    id SERIAL PRIMARY KEY,
    NombreFacultad character varying(255)
);

-- Tabla: Programas (referencia a Facultades)
CREATE TABLE IF NOT EXISTS public.Programas (
    id SERIAL PRIMARY KEY,
    NombrePrograma character varying(255),
    Sede character varying(255),
    Session character varying(255),
    FacultadId integer
);

-- Tabla: Materias (no tiene claves foráneas)
CREATE TABLE IF NOT EXISTS public.Materias (
    id SERIAL PRIMARY KEY,
    CodigoMateria character varying(255),
    NombreMateria character varying(255),
    TipoMateria character varying(255)
);

-- Tabla: Pensums (referencia a Programas)
CREATE TABLE IF NOT EXISTS public.Pensums (
    id SERIAL PRIMARY KEY,
    Pensum character varying(255),
    Semetre character varying(255),
    ProgramId integer
);

-- Tabla: Estudiantes (referencia a Pensums)
CREATE TABLE IF NOT EXISTS public.Estudiantes (
    id SERIAL PRIMARY KEY,
    TipoDoc character varying(255),
    people_code_id character varying(255),
    Nombre character varying(255),
    EstadoAlumnoPrograma character varying(255),
    Semetre character varying(255),
    Direccion character varying(255),
    Ciudad character varying(255),
    Departamento character varying(255),
    Telefono character varying(255),
    TelMovil character varying(255),
    Email character varying(255),
    Genero character varying(255),
    SemenNumero character varying(255),
    PensumId integer
);

-- Tabla: PeriodoAcademicos (no tiene claves foráneas)
CREATE TABLE IF NOT EXISTS public.PeriodoAcademicos (
    id SERIAL PRIMARY KEY,
    Year integer,
    Periodo character varying(255),
    NomNotaPeriodo character varying(255)
);

-- Tabla: Docentes (no tiene claves foráneas)
CREATE TABLE IF NOT EXISTS public.Docentes (
    id SERIAL PRIMARY KEY,
    Cog_Docente character varying(255),
    Nom_Docente character varying(255)
);

-- Tabla: Notas (referencia a varias tablas)
CREATE TABLE IF NOT EXISTS public.Notas (
    id SERIAL PRIMARY KEY,
    GRADE_ACTIVITY character varying(255),
    FINAL_GRADE character varying(255),
    Nota character varying(255),
    Gano integer,
    Periodo character varying(255),
    PromNotaMin character varying(255),
    ProxNotaMin character varying(255),
    Seccion character varying(255),
    EstudianteId integer,
    MaterialId integer,
    ProgramId integer,
    DocenteId integer,
    PeriodoAcademicoId integer
);

-- Tabla: Users (referencia a Roles)
CREATE TABLE IF NOT EXISTS public.Users (
    id SERIAL PRIMARY KEY,
    Avatar character varying(255),
    Nombre character varying(255),
    Email character varying(255),
    Password character varying(255),
    RolId integer,
    Datos character varying(1255)
);

-- Tabla: Roles (no tiene claves foráneas)
CREATE TABLE IF NOT EXISTS public.Rols (
    id SERIAL PRIMARY KEY,
    rol character varying(255)
);

-- Tabla: MateriaPorPensums (referencia a Pensums y Materias)
CREATE TABLE IF NOT EXISTS public.MateriaPorPensums (
    id SERIAL PRIMARY KEY,
    Sem character varying(255),
    SemetreMaterialNum character varying(255),
    PensumId integer,
    MaterialId integer
);

DO $$ 
BEGIN
   -- Relación Programas -> Facultades
   IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Programas')
      AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Facultades') THEN
      ALTER TABLE public.Programas
      ADD CONSTRAINT fk_programas_facultades
      FOREIGN KEY (FacultadId) REFERENCES public.Facultades(id) ON DELETE CASCADE;
   END IF;
   
   -- Relación Pensums -> Programas
   IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Pensums')
      AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Programas') THEN
      ALTER TABLE public.Pensums
      ADD CONSTRAINT fk_pensums_programas
      FOREIGN KEY (ProgramId) REFERENCES public.Programas(id) ON DELETE CASCADE;
   END IF;

   -- Relación Estudiantes -> Pensums
   IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Estudiantes')
      AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Pensums') THEN
      ALTER TABLE public.Estudiantes
      ADD CONSTRAINT fk_estudiantes_pensums
      FOREIGN KEY (PensumId) REFERENCES public.Pensums(id) ON DELETE CASCADE;
   END IF;

   -- Relación Notas -> Estudiantes, Materias, Programas, Docentes, PeriodoAcademicos
   IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Notas')
      AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Estudiantes') THEN
      ALTER TABLE public.Notas
      ADD CONSTRAINT fk_notas_estudiantes
      FOREIGN KEY (EstudianteId) REFERENCES public.Estudiantes(id) ON DELETE CASCADE;
   END IF;

   IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Notas')
      AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Materias') THEN
      ALTER TABLE public.Notas
      ADD CONSTRAINT fk_notas_materias
      FOREIGN KEY (MaterialId) REFERENCES public.Materias(id) ON DELETE CASCADE;
   END IF;

   IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Notas')
      AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Programas') THEN
      ALTER TABLE public.Notas
      ADD CONSTRAINT fk_notas_programas
      FOREIGN KEY (ProgramId) REFERENCES public.Programas(id) ON DELETE CASCADE;
   END IF;

   IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Notas')
      AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Docentes') THEN
      ALTER TABLE public.Notas
      ADD CONSTRAINT fk_notas_docentes
      FOREIGN KEY (DocenteId) REFERENCES public.Docentes(id) ON DELETE CASCADE;
   END IF;

   IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Notas')
      AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'PeriodoAcademicos') THEN
      ALTER TABLE public.Notas
      ADD CONSTRAINT fk_notas_periodos
      FOREIGN KEY (PeriodoAcademicoId) REFERENCES public.PeriodoAcademicos(id) ON DELETE CASCADE;
   END IF;

   -- Relación Users -> Rols
   IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Users')
      AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Rols') THEN
      ALTER TABLE public.Users
      ADD CONSTRAINT fk_users_roles
      FOREIGN KEY (RolId) REFERENCES public.Rols(id) ON DELETE CASCADE;
   END IF;

   -- Relación MateriaPorPensums -> Pensums, Materias
   IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'MateriaPorPensums')
      AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Pensums') THEN
      ALTER TABLE public.MateriaPorPensums
      ADD CONSTRAINT fk_materiaporpensums_pensums
      FOREIGN KEY (PensumId) REFERENCES public.Pensums(id) ON DELETE CASCADE;
   END IF;

   IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'MateriaPorPensums')
      AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Materias') THEN
      ALTER TABLE public.MateriaPorPensums
      ADD CONSTRAINT fk_materiaporpensums_materias
      FOREIGN KEY (MaterialId) REFERENCES public.Materias(id) ON DELETE CASCADE;
   END IF;

END $$;


