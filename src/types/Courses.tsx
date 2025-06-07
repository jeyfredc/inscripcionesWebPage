export type CoursesInscriptionData = {
    IdEstudiante: number
    CodigoMateria: string
}
    
export type CorseDeleteData = {
    IdEstudiante: number
    CodigoMateria: string
}
export type CourseInscription= CoursesInscriptionData[]
export type CourseInscriptionDelete= CoursesInscriptionData[]



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


export type CoursesInscriptionDeleteResponse = {
    Data: {
        Resultado: boolean
        Mensaje: string
    }[]
    Success: boolean
    Message: string
    Errors: string[]
    ValidationErrors: {}
}

export type FormRegisterNewCourse = {
    Codigo: string
    Nombre: string
    Descripcion: string
    Creditos: number
    Cupo_Maximo: number
    Activa: boolean
}

export type ResponseCourseWithoutAssign = {
    Data: CourseWithoutAssignData[]
    Success: boolean
    Message: string
    Errors: string[]
    ValidationErrors: {}
}

export type CourseWithoutAssignData = {
    Id: number
    Codigo: string
    Nombre: string
    Descripcion: string
    Creditos: number
    Cupo_Maximo: number
    Activa: boolean
    Creado_En: string
    Cupo_Disponible: number
}

export type FormAssignCourse = {
    ProfesorId: number,
    CodigoMateria: string,
    Horario: string,
    Grupo: string
}


export type CoursesAndSchedules = {
    Data: CoursesAndSchedulesData[]
    Success: boolean
    Message: string
    Errors: string[]
    ValidationErrors: {}
}
    
    
export type CoursesAndSchedulesData = {
    Id: number,
    Codigo: string,
    Materia: string,
    Descripcion: string,
    Creditos: number,
    Cupo_Maximo: number,
    Cupo_Disponible: number,
    Profesor_Asignado: string,
    ProfesorId:number,
    Horarios: string
}

export type FormUpdateSubject= {
    MateriaId: number,
    Codigo: string,
    Nombre: string,
    Descripcion: string,
    Creditos: number,
    Cupo_Maximo: number,
    Horarios: string
}



