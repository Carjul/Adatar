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
    notasemestre: [],
    notasperpro: [],
    notasperma: {},//notas por materia
    semestres: [],
    notas_estudiantes: [],
    notas_del_semestre: [],
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
        setNotasperma: (state, action) => {
            const notas_por_materia = {
                Materia: [],
                Gano: [],
                Perdio: [],
            }

            for (let i = 0; i < action.payload.length; i++) {
                const element = action.payload[i];
                notas_por_materia.Materia.push(element.nombre)
                notas_por_materia.Gano.push(element.gano)
                notas_por_materia.Perdio.push(element.perdio)
            }
            state.notasperma = notas_por_materia
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
            const arreglo = [
                { value: [], name: "Cero" },
                { value: [], name: "Muy Baja" },
                { value: [], name: "Baja" },
                { value: [], name: "Media" },
                { value: [], name: "Alta" },
                { value: [], name: "Muy Alta" },
            ]
            const arr = []

            for (let i = 0; i < state.programa.length; i++) {
                const ele = state.programa[i];
                state.notas.forEach((e) => {

                    if (e.ProgramaId === ele.id && e.Nota == 0.0) {
                        arreglo[0].value.push(e)
                    }
                    if (e.ProgramaId === ele.id && e.Nota > 0.0 && e.Nota < 2.0) {
                        arreglo[1].value.push(e)
                    }
                    if (e.ProgramaId === ele.id && e.Nota >= 2 && e.Nota < 3.0) {
                        arreglo[2].value.push(e)
                    }
                    if (e.ProgramaId === ele.id && e.Nota >= 3.0 && e.Nota < 4.0) {
                        arreglo[3].value.push(e)
                    }
                    if (e.ProgramaId === ele.id && e.Nota >= 4.0 && e.Nota < 4.5) {
                        arreglo[4].value.push(e)
                    }
                    if (e.ProgramaId === ele.id && e.Nota >= 4.5 && e.Nota <= 5.0) {
                        arreglo[5].value.push(e)
                    }
                })

            }

            for (let i = 0; i < arreglo.length; i++) {
                const element = arreglo[i];
                arr.push({ value: element.value.length, name: element.name })
            }
            state.notasperpro = arr
            console.log(arr);
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

            const Cero = [[], [], [], [], [], [], [], [], [], []]
            const MuyBaja = [[], [], [], [], [], [], [], [], [], []]
            const Baja = [[], [], [], [], [], [], [], [], [], []]
            const Medio = [[], [], [], [], [], [], [], [], [], []]
            const Alta = [[], [], [], [], [], [], [], [], [], []]
            const MuyAlta = [[], [], [], [], [], [], [], [], [], []]

            for (let i = 0; i < action.payload.length; i++) {
                const element = action.payload[i];

                var index = parseInt(element.semestres) - 1;

                if (!isNaN(index)) {

                    if (element.nota == 0.0) {
                        Cero[index].push(element)
                    }
                    if (element.nota > 0.0 && element.nota < 2.0) {
                        MuyBaja[index].push(element)
                    }
                    if (element.nota >= 2.0 && element.nota < 3.0) {
                        Baja[index].push(element)
                    }
                    if (element.nota >= 3.0 && element.nota < 4.0) {
                        Medio[index].push(element)
                    }
                    if (element.nota >= 4.0 && element.nota < 4.5) {
                        Alta[index].push(element)
                    }
                    if (element.nota >= 4.5 && element.nota <= 5.0) {
                        MuyAlta[index].push(element)
                    }

                }
            }



            const materias = [Cero, MuyBaja, Baja, Medio, Alta, MuyAlta]
            var result = []
            for (let i = 0; i < materias.length; i++) {
                const element = materias[i];
                const num = []
                element.forEach((e) => {
                    num.push(e.length)
                })
                result.push(num)
            }




            state.notasmateria = result

        },
        setNotastate: (state, action) => {//datos para la tabla de estidiantes por semestre

            
           
            const semestres = action.payload.filter((e) => {
            return e.semestres !== null
            })

            
            const elementosUnicos = [];
            semestres.forEach(num => {
                if (!elementosUnicos.includes(num.semestres)) {
                    elementosUnicos.push(num.semestres);
                }
            })

            state.semestres = elementosUnicos.sort()


        },
        setNotas_Por_Estudiante: (state, action) => {

            const notas = []
            //filtrar elementos sin estar repetido por su is
            const elementosUnicos = [];

            action.payload.forEach(num => {
                if (!elementosUnicos.includes(num.estudiante_id)) {
                    elementosUnicos.push(num);

                }
            })

            for (let j = 0; j < elementosUnicos.length; j++) {
                const id = elementosUnicos[j].estudiante_id;
                const nombre = elementosUnicos[j].estudiante_nombre;
                var data = action.payload.filter((e) => e.estudiante_id === id)
                var arreglo = [nombre, data.length, data.length]
                notas.push(arreglo)
            }


            const registro = {};

            notas.forEach((elemento) => {
                const clave = elemento[0];
                if (registro[clave]) {
                    registro[clave].contador++;
                } else {
                    registro[clave] = {
                        elemento: elemento,
                        contador: 1,
                    };
                }
            });

            const resultado = Object.values(registro).map((objeto) => {
                const elemento = objeto.elemento;

                return elemento;
            });

            console.log(resultado);

            state.notas_estudiantes = resultado
        }

    }
})

export default dataSlice.reducer
export const { setNotas_Por_Estudiante, setNotasperma, setNotasmateria, setNotastate, setNota, setPeriodo, setPrograma, setDocente, setEstudiante, setMateriaPorPensum, setSede, setMateria, setPensum, setFacultad } = dataSlice.actions