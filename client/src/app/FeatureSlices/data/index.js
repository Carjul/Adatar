import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    facultad: [],
    pensum: [],
    materias: [],
    materiaPorPensum: [],
    estudiantes: [],
    docentes: [],
    programa: [],
    sede: [],
    periodoAcademico: [],
    notas: [],
    notasmateria: [],
    notastate: [],
    notasperpro: [],
    notasperma: [],
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setNota: (state, action) => {
            state.notas = action.payload
        },
        setPeriodo: (state, action) => {
            state.periodoAcademico = action.payload
        },
        setSede: (state, action) => {
            var sedes = []
            action.payload?.forEach(e => {
                sedes.push(e.Sede)
            });
            state.sede = sedes.filter((item, index) => {
                return sedes.indexOf(item) === index;
            })
        },
        setPrograma: (state, action) => {
            state.programa = action.payload
        },
        setDocente: (state, action) => {
            state.docentes = action.payload
        },
        setEstudiante: (state, action) => {
            state.estudiantes = action.payload
        },
        setMateriaPorPensum: (state, action) => {
            state.materiaPorPensum = action.payload
        },
        setMateria: (state, action) => {
            state.materias = action.payload
        },
        setPensum: (state, action) => {
            state.pensum = action.payload
        },
        setFacultad: (state, action) => {
            state.facultad = action.payload
        },
        setNotasmateria: (state, action) => {

            const notas_programa = []
            for (let i = 0; i < state.notas.length; i++) {
                const e = state.notas[i];
                if (e.ProgramaId === action.payload && e.Gano=== 0) notas_programa.push(e)
            }

            const data = []

            for (let i = 0; i < notas_programa.length; i++) {
                const element = notas_programa[i].MateriaId;
                state.materias.forEach(e => e.id === element ? data.push(e) : "")
            }
            const norepeat = []
            for (let i = 0; i < data.length; i++) {
                const e = data[i];
                if (data.indexOf(e) === i) norepeat.push(e)
            }
            const materias = []
            const materiasdata=[]
            for (let i = 0; i < norepeat.length; i++) {
                const dato =[]
                const e = norepeat[i]
                notas_programa.forEach((el) =>{if(el.MateriaId === e.id)  dato.push(el)})
                materiasdata.push({ value: dato, name: e.NombreMateria, })
                materias.push({ value: dato.length, name: e.NombreMateria, })
            }
            state.notasperma= materiasdata
         
            state.notasmateria = materias

        },
        setNotastate: (state, action) => {
            state.notastate = state.notasmateria.filter(e => {
                return e.nota.Gano === parseInt(action.payload)
            })
        },
        setNotasperpro: (state, action) => {
            var x = state.notas.filter(e => {
                return e.ProgramaId === action.payload.id
            })
            var arr = x.filter(e => {
                return e.Gano === 0
            })

            state.notasperpro = state.notasperpro.concat([{ value: arr.length, name: action.payload.nombre }])
        },
        setCleand: (state, action) => {
            state.notasperpro = action.payload
        }
    }
})

export default dataSlice.reducer
export const { setCleand, setNotasperpro, setNotasmateria, setNotastate, setNota, setPeriodo, setPrograma, setDocente, setEstudiante, setMateriaPorPensum, setSede, setMateria, setPensum, setFacultad } = dataSlice.actions