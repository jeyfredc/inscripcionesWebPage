

    

export type TeacherResponseData = {
    NombreProfesor: string
    Horario: string
    CupoMaximo: number
    CupoDisponible: number
    NombreMateria: string
    CodigoMateria: string
}

export type TeacherResponse = {
    Data: TeacherResponseData[]
    Success: boolean
    Message: string
    Errors: string[]
    ValidationErrors: {}
}


export type RequestUnassignTeacher = {
    ProfesorId: number,
    CodigoMateria: string
}