import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    programa: [],
    sede: [],
    periodoAcademico: [],
    notas: [],
    notasmateria: [],
    notastate: [],
    notasemestre: [],
    notasperproSem: [],
    notasperpro: [],
    notasperpro2: [],
    notasperma: {},//notas por materia
    notasperma2: {},//notas por materia2
    semestres: [],
    notas_estudiantes: [],
    Notas_por_Est: [],
    DataGraficoEst: [],
    notas_del_semestre: [],
    programatemp: [],
    EstMaterias: [],
    EstSemestre: [],

}
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
      
        setProgramatemp: (state, action) => {
            state.programatemp = action.payload
        },
        setEstMaterias: (state, action) => {
            const result = [];
            const students = {};

            action.payload.forEach((item) => {
                const { identificacion,
                    people_code_id,
                    nombres,
                    email,
                    tel_movil,
                    tel_fijo,
                    direccion,
                    cod_materia,
                    materia,
                    tipo_materia,
                    cog_docente,
                    nom_docente,
                    semestre,
                    nota, } = item;

                if (!students[identificacion]) {
                    // Si el estudiante no está en el objeto de estudiantes, lo agregamos.
                    students[identificacion] = {
                        identificacion,
                        people_code_id,
                        nombres,
                        email,
                        tel_movil,
                        tel_fijo,
                        direccion,
                        materias: []
                    };
                    result.push(students[identificacion]);
                }

                // Agregamos la materia al estudiante correspondiente.
                students[identificacion].materias.push({ cod_materia, materia,tipo_materia,cog_docente, nom_docente, semestre, nota });
            });

            state.EstMaterias = result;
        },
        setNotasEst: (state, action) => {
            state.Notas_por_Est = action.payload
        },   
        //
        setNotaEstG: (state, action) => {
            const x = [['score', 'Nota', 'Nombre']]
            for (let i = 0; i < action.payload.length; i++) {
                const element = action.payload[i];
                x.push([(20 * parseFloat(element.Nota)), parseFloat(element.Nota), element.NombreMateria])
            }
            state.DataGraficoEst = x;
        },
        setNotaSem: (state, action) => {

            state.notasperproSem = action.payload

        },
        setNota: (state, action) => {

            state.notasperpro = action.payload

        },
        setNota2: (state, action) => {

            state.notasperpro2 = action.payload

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
        setNotasperma2: (state, action) => {
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
            state.notasperma2 = notas_por_materia
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
        setSemestate: (state, action) => {
            state.semestres = action.payload
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

            state.notas_estudiantes = resultado
        },
        setEstSemestre: (state, action) => {
            state.EstSemestre = action.payload
        },

    }
})

export default dataSlice.reducer
export const { setEstSemestre, setEstMaterias, setProgramatemp, setNotaEstG, setSemestate, setNotasEst, setArticulos, setNota2, setNotas_Por_Estudiante, setNotasperma, setNotasperma2, setNotasmateria, setNotastate, setNota, setNotaSem, setPeriodo, setPrograma, setDocente, setEstudiante, setMateriaPorPensum, setSede, setMateria, setPensum, setFacultad } = dataSlice.actions