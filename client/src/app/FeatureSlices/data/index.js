import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    facultad: [],
    pensum: [],
    materias: [],
    materiaPorPensum: [],
    estudiantes: [],
    docentes: [],
    programa: [],
    sede:[],
    periodoAcademico: [],
    notas: [],
    notasmateria:[],
    notastate:[],
	notasperpro:[]
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setNota: (state, action) => {
            state.notas = action.payload
        },
        setPeriodo:(state, action)=>{
            state.periodoAcademico = action.payload
        },
        setSede:(state,action)=>{
            var sedes= []
            action.payload?.forEach( e=> {
              sedes.push(e.Sede)
            });
           state.sede= sedes.filter((item,index)=>{
              return sedes.indexOf(item) === index;
            })
        },
        setPrograma: (state, action) => {
            state.programa=action.payload
        },
        setDocente: (state, action) => {
            state.docentes= action.payload
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
        setNotasmateria: (state, action)=> {
            state.notasmateria=state.notas.filter(e=>{
                return e.ProgramaId === action.payload
            })
        },
        setNotastate: (state, action)=>{
            state.notastate=state.notasmateria.filter(e=>{
                return e.Gano ===parseInt(action.payload)
            })
        },
		setNotasperpro: (state, action)=>{
			var x=state.notas.filter(e=>{
                return e.ProgramaId === action.payload.id
            })
			var arr=x.filter(e=>{
                return e.Gano === 0
            })
			
			state.notasperpro=state.notasperpro.concat([{ value: arr.length, name: action.payload.nombre }])
		},
		setCleand:(state,action)=>{
			state.notasperpro=action.payload
		}
    }
})

export default dataSlice.reducer
export const {setCleand,setNotasperpro,setNotasmateria,setNotastate,setNota,setPeriodo,setPrograma,setDocente,setEstudiante,setMateriaPorPensum,setSede, setMateria, setPensum,setFacultad } = dataSlice.actions