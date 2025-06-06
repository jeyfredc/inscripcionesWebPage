
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