
export type responseStudent = {
    Data: {
        EstudianteId: number,
        CreditosDisponibles: number
    },
    Success: boolean,
    Message: string,
    Errors: string[],
    ValidationErrors: {}
}

export type responseCourseByID = {
    Data: CourseStudent[],
    Success: boolean,
    Message: string,
    Errors: string[],
    ValidationErrors: {}
}



export type CourseStudent = {
    Codigomateria: string,
    Materia: string,
    Profesor: string,
    Horario: string,
    FehaInscripcion: string
}


export type ClassMatesResponse = {
    Data: ClassMate[],
    Success: boolean,
    Message: string,
    Errors: string[],
    ValidationErrors: {}
}


export type ClassMate = {
    CodigoMateria: string,
    Materia: string,
    NombreEstudiante: string,
    Email: string,
    Matricula: string
}