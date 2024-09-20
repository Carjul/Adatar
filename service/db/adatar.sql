
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 215 (class 1259 OID 16388)
-- Name: docentes_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.docentes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.docentes_id_seq OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16389)
-- Name: Docentes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Docentes" (
    id integer DEFAULT nextval('public.docentes_id_seq'::regclass) NOT NULL,
    "Cog_Docente" character varying(255) NOT NULL,
    "Nom_Docente" character varying(255) NOT NULL
);


ALTER TABLE public."Docentes" OWNER TO admin;

--
-- TOC entry 217 (class 1259 OID 16395)
-- Name: estudiantes_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.estudiantes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estudiantes_id_seq OWNER TO admin;

--
-- TOC entry 218 (class 1259 OID 16396)
-- Name: Estudiantes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Estudiantes" (
    id integer DEFAULT nextval('public.estudiantes_id_seq'::regclass) NOT NULL,
    "TipoDoc" character varying(255) NOT NULL,
    people_code_id character varying(255) NOT NULL,
    "Identificacion" character varying(255) NOT NULL,
    "Nombres" character varying(255) NOT NULL,
    "EstadoAlumnoPrograma" character varying(255) NOT NULL,
    "Semestre" character varying(255),
    "Direccion" character varying(255) NOT NULL,
    "Ciudad" character varying(255) NOT NULL,
    "Departamento" character varying(255) NOT NULL,
    "TelFijo" character varying(255),
    "TelMovil" character varying(255) NOT NULL,
    "Email" character varying(255) NOT NULL,
    "Genero" character varying(255) NOT NULL,
    "SemeNumero" character varying(255) NOT NULL,
    "PensumId" integer NOT NULL
);


ALTER TABLE public."Estudiantes" OWNER TO admin;

--
-- TOC entry 219 (class 1259 OID 16402)
-- Name: facultades_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.facultades_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.facultades_id_seq OWNER TO admin;

--
-- TOC entry 220 (class 1259 OID 16403)
-- Name: Facultades; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Facultades" (
    id integer DEFAULT nextval('public.facultades_id_seq'::regclass) NOT NULL,
    "NombreFacultad" character varying(255) NOT NULL
);


ALTER TABLE public."Facultades" OWNER TO admin;

--
-- TOC entry 221 (class 1259 OID 16407)
-- Name: materiaporpensums_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.materiaporpensums_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.materiaporpensums_id_seq OWNER TO admin;

--
-- TOC entry 222 (class 1259 OID 16408)
-- Name: MateriaPorPensums; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."MateriaPorPensums" (
    id integer DEFAULT nextval('public.materiaporpensums_id_seq'::regclass) NOT NULL,
    "Seme" character varying(255) NOT NULL,
    "SemMateriaNum" character varying(255) NOT NULL,
    "PensumId" integer NOT NULL,
    "MateriaId" integer NOT NULL
);


ALTER TABLE public."MateriaPorPensums" OWNER TO admin;

--
-- TOC entry 223 (class 1259 OID 16414)
-- Name: materias_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.materias_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.materias_id_seq OWNER TO admin;

--
-- TOC entry 224 (class 1259 OID 16415)
-- Name: Materias; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Materias" (
    id integer DEFAULT nextval('public.materias_id_seq'::regclass) NOT NULL,
    "CodigoMateria" character varying(255) NOT NULL,
    "NombreMateria" character varying(255) NOT NULL,
    "TipoMateria" character varying(255) NOT NULL
);


ALTER TABLE public."Materias" OWNER TO admin;

--
-- TOC entry 225 (class 1259 OID 16421)
-- Name: notas_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.notas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notas_id_seq OWNER TO admin;

--
-- TOC entry 226 (class 1259 OID 16422)
-- Name: Notas; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Notas" (
    id integer DEFAULT nextval('public.notas_id_seq'::regclass) NOT NULL,
    "GRADE_ACTIVITY" character varying(255),
    "FINAL_GRADE" character varying(255),
    "Nota" character varying(255) NOT NULL,
    "Gano" integer NOT NULL,
    "Perdio" integer NOT NULL,
    "Rango" character varying(255) NOT NULL,
    "ProxNotaMin" character varying(255),
    "Seccion" character varying(255) NOT NULL,
    "EstudianteId" integer NOT NULL,
    "MateriaId" integer NOT NULL,
    "ProgramaId" integer NOT NULL,
    "DocenteId" integer NOT NULL,
    "PeriodoAcademicoId" integer NOT NULL
);


ALTER TABLE public."Notas" OWNER TO admin;

--
-- TOC entry 227 (class 1259 OID 16428)
-- Name: pensums_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.pensums_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pensums_id_seq OWNER TO admin;

--
-- TOC entry 228 (class 1259 OID 16429)
-- Name: Pensums; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Pensums" (
    id integer DEFAULT nextval('public.pensums_id_seq'::regclass) NOT NULL,
    "Pensum" character varying(255) NOT NULL,
    "Semestres" character varying(255),
    "ProgramaId" integer NOT NULL
);


ALTER TABLE public."Pensums" OWNER TO admin;

--
-- TOC entry 229 (class 1259 OID 16435)
-- Name: periodoacademicos_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.periodoacademicos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.periodoacademicos_id_seq OWNER TO admin;

--
-- TOC entry 230 (class 1259 OID 16436)
-- Name: PeriodoAcademicos; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."PeriodoAcademicos" (
    id integer DEFAULT nextval('public.periodoacademicos_id_seq'::regclass) NOT NULL,
    "Year" integer NOT NULL,
    "Periodo" character varying(255) NOT NULL,
    "NomNotaPeriodo" character varying(255) NOT NULL
);


ALTER TABLE public."PeriodoAcademicos" OWNER TO admin;

--
-- TOC entry 231 (class 1259 OID 16442)
-- Name: programas_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.programas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.programas_id_seq OWNER TO admin;

--
-- TOC entry 232 (class 1259 OID 16443)
-- Name: Programas; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Programas" (
    id integer DEFAULT nextval('public.programas_id_seq'::regclass) NOT NULL,
    "NombrePrograma" character varying(255) NOT NULL,
    "Sede" character varying(255) NOT NULL,
    "Sesion" character varying(255) NOT NULL,
    "FacultadeId" integer NOT NULL
);


ALTER TABLE public."Programas" OWNER TO admin;

--
-- TOC entry 233 (class 1259 OID 16449)
-- Name: rols_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.rols_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rols_id_seq OWNER TO admin;

--
-- TOC entry 234 (class 1259 OID 16450)
-- Name: Rols; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Rols" (
    id integer DEFAULT nextval('public.rols_id_seq'::regclass) NOT NULL,
    rol character varying(255) NOT NULL
);


ALTER TABLE public."Rols" OWNER TO admin;

--
-- TOC entry 235 (class 1259 OID 16454)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO admin;

--
-- TOC entry 236 (class 1259 OID 16455)
-- Name: Users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Users" (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    "Avatar" character varying(255),
    "Nombre" character varying(255) NOT NULL,
    "Email" character varying(255) NOT NULL,
    "Password" character varying(255),
    "RolId" integer NOT NULL,
    "Datos" character varying(255)[]
);


ALTER TABLE public."Users" OWNER TO admin;

 
 

SELECT pg_catalog.setval('public.docentes_id_seq', 4635, true);


--
-- TOC entry 3468 (class 0 OID 0)
-- Dependencies: 217
-- Name: estudiantes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.estudiantes_id_seq', 171575, true);


--
-- TOC entry 3469 (class 0 OID 0)
-- Dependencies: 219
-- Name: facultades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.facultades_id_seq', 65, true);


--
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 221
-- Name: materiaporpensums_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.materiaporpensums_id_seq', 7804, true);


--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 223
-- Name: materias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.materias_id_seq', 8007, true);


--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 225
-- Name: notas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.notas_id_seq', 319263, true);


--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 227
-- Name: pensums_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.pensums_id_seq', 175, true);


--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 229
-- Name: periodoacademicos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.periodoacademicos_id_seq', 27, true);


--
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 231
-- Name: programas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.programas_id_seq', 423, true);


--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 233
-- Name: rols_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.rols_id_seq', 6, true);


--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 235
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 170, true);


--
-- TOC entry 3265 (class 2606 OID 16462)
-- Name: Docentes Docentes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Docentes"
    ADD CONSTRAINT "Docentes_pkey" PRIMARY KEY (id);


--
-- TOC entry 3267 (class 2606 OID 16464)
-- Name: Estudiantes Estudiantes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Estudiantes"
    ADD CONSTRAINT "Estudiantes_pkey" PRIMARY KEY (id);


--
-- TOC entry 3269 (class 2606 OID 16466)
-- Name: Facultades Facultades_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Facultades"
    ADD CONSTRAINT "Facultades_pkey" PRIMARY KEY (id);


--
-- TOC entry 3271 (class 2606 OID 16468)
-- Name: MateriaPorPensums MateriaPorPensums_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."MateriaPorPensums"
    ADD CONSTRAINT "MateriaPorPensums_pkey" PRIMARY KEY (id);


--
-- TOC entry 3273 (class 2606 OID 16470)
-- Name: Materias Materias_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Materias"
    ADD CONSTRAINT "Materias_pkey" PRIMARY KEY (id);


--
-- TOC entry 3275 (class 2606 OID 16472)
-- Name: Notas Notas_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Notas"
    ADD CONSTRAINT "Notas_pkey" PRIMARY KEY (id);


--
-- TOC entry 3277 (class 2606 OID 16474)
-- Name: Pensums Pensums_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Pensums"
    ADD CONSTRAINT "Pensums_pkey" PRIMARY KEY (id);


--
-- TOC entry 3279 (class 2606 OID 16476)
-- Name: PeriodoAcademicos PeriodoAcademicos_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."PeriodoAcademicos"
    ADD CONSTRAINT "PeriodoAcademicos_pkey" PRIMARY KEY (id);


--
-- TOC entry 3281 (class 2606 OID 16478)
-- Name: Programas Programas_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Programas"
    ADD CONSTRAINT "Programas_pkey" PRIMARY KEY (id);


--
-- TOC entry 3283 (class 2606 OID 16480)
-- Name: Rols Rols_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Rols"
    ADD CONSTRAINT "Rols_pkey" PRIMARY KEY (id);


--
-- TOC entry 3285 (class 2606 OID 16482)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3286 (class 2606 OID 16483)
-- Name: Estudiantes Estudiantes_PensumId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Estudiantes"
    ADD CONSTRAINT "Estudiantes_PensumId_fkey" FOREIGN KEY ("PensumId") REFERENCES public."Pensums"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3287 (class 2606 OID 16488)
-- Name: MateriaPorPensums MateriaPorPensums_MateriaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."MateriaPorPensums"
    ADD CONSTRAINT "MateriaPorPensums_MateriaId_fkey" FOREIGN KEY ("MateriaId") REFERENCES public."Materias"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3288 (class 2606 OID 16493)
-- Name: MateriaPorPensums MateriaPorPensums_PensumId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."MateriaPorPensums"
    ADD CONSTRAINT "MateriaPorPensums_PensumId_fkey" FOREIGN KEY ("PensumId") REFERENCES public."Pensums"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3289 (class 2606 OID 16498)
-- Name: Notas Notas_DocenteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Notas"
    ADD CONSTRAINT "Notas_DocenteId_fkey" FOREIGN KEY ("DocenteId") REFERENCES public."Docentes"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3290 (class 2606 OID 16503)
-- Name: Notas Notas_EstudianteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Notas"
    ADD CONSTRAINT "Notas_EstudianteId_fkey" FOREIGN KEY ("EstudianteId") REFERENCES public."Estudiantes"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3291 (class 2606 OID 16508)
-- Name: Notas Notas_MateriaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Notas"
    ADD CONSTRAINT "Notas_MateriaId_fkey" FOREIGN KEY ("MateriaId") REFERENCES public."Materias"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3292 (class 2606 OID 16513)
-- Name: Notas Notas_PeriodoAcademicoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Notas"
    ADD CONSTRAINT "Notas_PeriodoAcademicoId_fkey" FOREIGN KEY ("PeriodoAcademicoId") REFERENCES public."PeriodoAcademicos"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3293 (class 2606 OID 16518)
-- Name: Notas Notas_ProgramaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Notas"
    ADD CONSTRAINT "Notas_ProgramaId_fkey" FOREIGN KEY ("ProgramaId") REFERENCES public."Programas"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3294 (class 2606 OID 16523)
-- Name: Pensums Pensums_ProgramaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Pensums"
    ADD CONSTRAINT "Pensums_ProgramaId_fkey" FOREIGN KEY ("ProgramaId") REFERENCES public."Programas"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3295 (class 2606 OID 16528)
-- Name: Programas Programas_FacultadeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Programas"
    ADD CONSTRAINT "Programas_FacultadeId_fkey" FOREIGN KEY ("FacultadeId") REFERENCES public."Facultades"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3296 (class 2606 OID 16533)
-- Name: Users Users_RolId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_RolId_fkey" FOREIGN KEY ("RolId") REFERENCES public."Rols"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2024-09-20 15:58:52 UTC

--
-- PostgreSQL database dump complete
--

