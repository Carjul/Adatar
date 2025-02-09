const { Router } = require('express')
const { db } = require('../db/db.js')

const routerService = Router();

routerService.post("/notas", async (req, res) => {
    const { semestre, periodo_academico, programa_id } = req.body;
    if (!semestre || !periodo_academico || !programa_id) {
        res.status(501).json("error al buscar notas, faltan parametros");
    } else {
        let query = `
	SELECT e.id AS estudiante_id, e."Nombres" AS estudiante_nombre, m."SemMateriaNum" AS semestre, n."Nota" AS nota, n."ProxNotaMin" AS prox_nota_min
	FROM Public."Estudiantes" e
	JOIN Public."Notas" n ON e.id = n."EstudianteId"
	JOIN public."MateriaPorPensums" m ON n."MateriaId" = m."MateriaId" AND n."MateriaId" = m."MateriaId"
	WHERE m."SemMateriaNum"=$1 AND n."Perdio" =1 AND n."PeriodoAcademicoId"=$2 AND n."ProgramaId"=$3
	`
        const busqueda = await db.query(query, [semestre, periodo_academico, programa_id]);
        busqueda.rows ? res.status(200).json(busqueda.rows) : res.status(401).json("error al buscar notas");
    }

})

routerService.post('/notas/rango', async (req, res) => {
    const { programa_id, periodo_academico } = req.body
    if (!programa_id || !periodo_academico) {
        res.status(501).json("error al buscar notas_porrango, faltan parametros");
    }
    else {
        let query = `SELECT n.id, n."Nota" AS nota,
	CASE
		WHEN n."Nota" < '2.0' THEN 'Muy Baja'
		WHEN n."Nota" >= '2.0' AND n."Nota" < '3.0' THEN 'Baja'
		WHEN n."Nota" >= '3.0' AND n."Nota" < '4.0' THEN 'Media'
		WHEN n."Nota" >= '4.0' AND n."Nota" < '4.5' THEN 'Alta'
		WHEN n."Nota" >= '4.5' AND n."Nota" <= '5.0' THEN 'Muy Alta'
		ELSE 'N/A'
	END AS "rango",
	mp."SemMateriaNum" AS semestres
FROM Public."Notas" n
JOIN Public."MateriaPorPensums" mp ON n."MateriaId" = mp."MateriaId"
JOIN public."PeriodoAcademicos" pa ON pa.id = n."PeriodoAcademicoId"
JOIN Public."Programas" p ON p.id = n."ProgramaId"
WHERE P.id= $1 AND pa.id= $2
ORDER BY Semestres ASC;`

        const busqueda = await db.query(query, [programa_id, periodo_academico]);
        busqueda.rows ? res.status(200).json(busqueda.rows) : res.status(401).json("error al buscar notas por rango");
    }

})

routerService.post('/Notas_periodo_sem', async (req, res) => {
    const { programa_id, semestre, periodo_academico } = req.body
    if (!programa_id || !semestre || !periodo_academico) {
        res.status(501).json("error al buscar notas_por_sem, faltan parametros");
    }
    else {
        let query = `SELECT  COUNT(*) AS value ,n."Rango" AS name
	FROM Public."Notas" n
	JOIN Public."PeriodoAcademicos" ON "PeriodoAcademicos".id = n."PeriodoAcademicoId"
	JOIN Public."MateriaPorPensums" m ON m."MateriaId" = n."MateriaId"
	WHERE n."ProgramaId" =$1 AND m."SemMateriaNum"=$2 AND "PeriodoAcademicos".id=$3
	GROUP BY n."Rango";`
        const busqueda = await db.query(query, [programa_id, semestre, periodo_academico]);
        busqueda.rows ? res.status(200).json(busqueda.rows) : res.status(401).json("error al buscar notas por semestre");
    }
})

routerService.post("/Notas_periodo", async (req, res) => {
    const { programa_id, periodo_academico } = req.body
    if (!programa_id || !periodo_academico) {
        res.status(501).json("error al buscar notas_periodo, faltan parametros");
    }
    else {
        let query = `SELECT  COUNT(*) AS value ,n."Rango" AS name
	FROM Public."Notas" n
	JOIN public."PeriodoAcademicos" ON "PeriodoAcademicos".id = n."PeriodoAcademicoId"
	WHERE n."ProgramaId" =$1 AND "PeriodoAcademicos".id=$2
	GROUP BY n."Rango";`
        const busqueda = await db.query(query, [programa_id, periodo_academico]);
        busqueda.rows ? res.status(200).json(busqueda.rows) : res.status(401).json("error al buscar notas por periodo");
    }
})

routerService.get('/Notas_Facultades', async (req, res) => {
    const { NomNotaPeriodo } = req.query
    if (!NomNotaPeriodo) {
        res.status(501).json("error al buscar notas_facultades, faltan parametros");
    } else {
        let query = `SELECT COUNT(*) AS value, n."Rango" AS name
    FROM Public."Notas" n
    JOIN Public."PeriodoAcademicos" pa ON pa.id = n."PeriodoAcademicoId"
    JOIN public."Programas" p ON p.id = n."ProgramaId"
    JOIN public."Facultades" f ON p."FacultadeId" = f.id 
    WHERE pa."NomNotaPeriodo" = $1
    GROUP BY n."Rango";`

        const busqueda = await db.query(query, [NomNotaPeriodo]);
        busqueda.rows ? res.status(200).json(busqueda.rows) : res.status(401).json("error al buscar notas por facultad");
    }

})


routerService.post('/Notas_Facultad', async (req, res) => {
    const { facultad_id, periodo_id } = req.body
    if (!facultad_id || !periodo_id) {
        res.status(501).json("error al buscar notas_facultad, faltan parametros");
    } else {
        let query = `SELECT  COUNT(*) AS value ,n."Rango" AS name
	FROM Public."Notas" n
	JOIN Public."PeriodoAcademicos" pa ON pa.id = n."PeriodoAcademicoId"
	JOIN public."Programas" p ON p.id = n."ProgramaId"
	JOIN public."Facultades" f ON p."FacultadeId"=f.id
	WHERE f.id = $1 AND pa.id=$2
	GROUP BY n."Rango";`

        const busqueda = await db.query(query, [facultad_id, periodo_id]);
        busqueda.rows ? res.status(200).json(busqueda.rows) : res.status(401).json("error al buscar notas por facultad");
    }
})

routerService.get('/datosEst', async (req, res) => {
    const { people_code_id } = req.query
    if (!people_code_id) {
        res.status(501).json("error al buscar datos estudiante, faltan parametros");
    } else {
        let queryEst = `SELECT "Estudiantes".id AS "Id","Estudiantes"."Nombres", "Programas"."NombrePrograma","Materias"."NombreMateria","Notas"."Nota","PeriodoAcademicos"."Year","PeriodoAcademicos"."Periodo"  FROM "Estudiantes" AS e
	JOIN "Notas" ON "Notas"."EstudianteId" = e.id
	JOIN "Materias" ON "Materias".id = "Notas"."MateriaId"
	JOIN "Estudiantes" ON "Estudiantes".id = "Notas"."EstudianteId"
	JOIN "PeriodoAcademicos" ON "PeriodoAcademicos".id = "Notas"."PeriodoAcademicoId"
	JOIN "Programas" ON "Programas".id = "Notas"."ProgramaId"
	WHERE e.people_code_id=$1 `
        const busqueda = await db.query(queryEst, [people_code_id]);
        busqueda.rows ? res.status(200).json(busqueda.rows) : res.status(401).json("error al buscar estudiantes");
    }
})

routerService.get('/datosDoc', async (req, res) => {
    const { Cog_Docente } = req.query
    if (!Cog_Docente) {
        res.status(501).json("error al buscar datosDocente, faltan parametros");

    } else {
        let queryDocente = `SELECT D."Cog_Docente",
    D."Nom_Docente" AS "Nombres",
    "Programas"."NombrePrograma",
    "Materias"."NombreMateria",
    "Notas"."Nota",
    "PeriodoAcademicos"."Year",
    "Notas"."EstudianteId" AS "Estudiante_id"
FROM PUBLIC."Docentes" AS D
JOIN PUBLIC."Notas" ON "Notas"."DocenteId" = D.ID
JOIN PUBLIC."Materias" ON "Materias".ID = "Notas"."MateriaId"
JOIN PUBLIC."PeriodoAcademicos" ON "PeriodoAcademicos".ID = "Notas"."PeriodoAcademicoId"
JOIN PUBLIC."Programas" ON "Programas".ID = "Notas"."ProgramaId"
WHERE D."Cog_Docente"=$1`

        const busqueda = await db.query(queryDocente, [Cog_Docente]);
        busqueda.rows ? res.status(200).json(busqueda.rows) : res.status(401).json("error al buscar datos docentes");
    }
})

routerService.post("/semestres", async (req, res) => {
    const { programa_id } = req.body;
    if (!programa_id) {
        res.status(501).json("error al buscar semestres, faltan parametros");
    }
    else {
        let query = `SELECT DISTINCT "MateriaPorPensums"."SemMateriaNum" semestres FROM Public."Programas" p
JOIN public."Pensums" ON "Pensums"."ProgramaId" = p.id
JOIN public."MateriaPorPensums" ON "MateriaPorPensums"."PensumId" = "Pensums".id
WHERE p.id=$1`
        const busqueda = await db.query(query, [programa_id]);
        if(busqueda.rows.length >0){
            let arr = []
            for (let i = 0; i < busqueda.rows.length; i++) {
                const element = busqueda.rows[i];
                if(element.semestres !== "NULL")
               arr.push(element.semestres) 
            }
            res.status(200).json(arr.sort())
        }else{ res.status(401).json("error al buscar semestres")}
    }
})

routerService.post("/EstSemestres", async (req, res) => {
    const { semestre, periodo_academico, programa_id } = req.body;
    if (!semestre || !periodo_academico || !programa_id) {
        res.status(501).json("error al buscar EstSemestres, faltan parametros");
    }
    else {
        let query = `
		SELECT
		E."Identificacion" AS identificacion,
		E."Nombres" AS nombres,
		COUNT(CASE WHEN NOT N."Gano" = 1 THEN 1 END) AS "perdio",
		COUNT(CASE WHEN N."Gano" = 1 THEN 1 END) AS "gano",
		COUNT(N."Nota") AS "cantidad_materias",
		CASE
			WHEN COUNT(N."Nota") > 0 THEN
				ROUND((COUNT(CASE WHEN NOT N."Gano" = 1 THEN 1 END) * 100.0) / COUNT(N."Nota"))
			ELSE
				0
		END AS "porcentaje_perdida"
		FROM PUBLIC."Notas" N
		JOIN PUBLIC."Estudiantes" E ON E.ID = N."EstudianteId"
		WHERE N."PeriodoAcademicoId" =$1 AND N."ProgramaId" =$2 AND E."SemeNumero" =$3
		GROUP BY E."Identificacion",E."Nombres"
		ORDER BY  "perdio" DESC
	`
        const busqueda = await db.query(query, [periodo_academico, programa_id, semestre]);
        busqueda.rows ? res.status(200).json(busqueda.rows) : res.status(401).json("error al buscar semestres");

    }
})

routerService.post("/Materias", async (req, res) => {
    const { semestre, periodo_academico, programa_id } = req.body;
    if (!semestre || !periodo_academico || !programa_id) {
        res.status(501).json("error al buscar Materias, faltan parametros");
    } else {
        let query = `SELECT  n."MateriaId" AS materia_id, "Materias"."NombreMateria" AS nombre,
        COUNT(CASE WHEN n."Gano" = 1 THEN 1 END) AS "gano",
        COUNT(CASE WHEN NOT n."Gano" = 1 THEN 1 END) AS "perdio" FROM Public."Programas"
        JOIN public."Pensums" ON "Pensums"."ProgramaId" = "Programas".id
        JOIN public."MateriaPorPensums" ON "MateriaPorPensums"."PensumId" = "Pensums".id
        JOIN public."Materias" ON "Materias".id = "MateriaPorPensums"."MateriaId"
        JOIN public."Notas" n ON n."MateriaId" = "Materias".id
        JOIN public."PeriodoAcademicos" ON "PeriodoAcademicos".id = n."PeriodoAcademicoId"
        WHERE "Programas".id= $1 AND "MateriaPorPensums"."SemMateriaNum"= $2 AND "PeriodoAcademicos".id= $3
        GROUP BY n."MateriaId", "Materias"."NombreMateria"
	`
        const busqueda = await db.query(query, [programa_id, semestre, periodo_academico,]);
        busqueda.rows ? res.status(200).json(busqueda.rows) : res.status(401).json("error al buscar Materias");

    }
})

routerService.post("/EstMateria", async (req, res) => {
    const { semestre, periodo_academico, programa_id } = req.body;
    if (!semestre || !periodo_academico || !programa_id) {
        res.status(501).json("error al buscar EstMaterias, faltan parametros");
    } else {
        let query = `
        SELECT
        E."Identificacion" AS identificacion,
        E."people_code_id",
        E."Nombres" AS nombres,
        E."Email" AS email ,
        E."TelMovil" AS tel_movil,
        E."TelFijo" AS tel_fijo,
        E."Direccion" AS direccion,
        M."CodigoMateria" AS cod_materia,
        M."NombreMateria" AS materia,
        M."TipoMateria" AS tipo_materia,
        D."Cog_Docente" AS cog_docente,
        D."Nom_Docente" AS nom_docente,
        MP."SemMateriaNum" AS semestre,
        N."Nota" AS nota
        FROM PUBLIC."Notas" N
        JOIN PUBLIC."Estudiantes" E ON E.ID = N."EstudianteId"
        JOIN PUBLIC."Materias" M ON M.ID = N."MateriaId"
        JOIN PUBLIC."Docentes" D ON D.id = N."DocenteId"
        JOIN public."Pensums" ON "Pensums".id = E."PensumId"
        JOIN public."MateriaPorPensums" MP ON MP."MateriaId" = M.id AND MP."PensumId" = "Pensums".id
        WHERE N."PeriodoAcademicoId"=$1 AND N."ProgramaId"=$2 AND E."SemeNumero"=$3;
        `
        const busqueda = await db.query(query, [periodo_academico,programa_id, semestre]);
        busqueda.rows ? res.status(200).json(busqueda.rows) : res.status(401).json("error al buscar EstMaterias");

    }
})

module.exports = { routerService }

