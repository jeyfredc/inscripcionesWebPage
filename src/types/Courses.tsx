export type CoursesInscriptionData = {
    IdEstudiante: number
    CodigoMateria: string
}
    
export type CourseInscription= CoursesInscriptionData[]


export type CoursesAvailableData = {
    CodigoMateria: string
    Materia: string
    Creditos: number
    NombreProfesor: string
    Horario: string
    CupoMaximo: number
    CupoDisponible: number
}

export type CoursesAvailableResponse = {
    Data: CoursesAvailableData[]
    Success: boolean
    Message: string
    Errors: string[]
    ValidationErrors: {}
}

export type CoursesInscriptionResponse = {
    Data: {
        Resultado: boolean
        Mensaje: string
    }[]
    Success: boolean
    Message: string
    Errors: string[]
    ValidationErrors: {}
}


