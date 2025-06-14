


export interface UserRegistrationForm {
    Nombre: string;
    Email: string;
    Password: string;
    RolId: number;
}

export interface UserLoginForm {
    Email: string;
    Password: string;
}

export type FormErrors = {
    Nombre?: string;
    Email?: string;
    Password?: string;
    confirmPassword?: string;
};

export interface UserResponseData {
    Id: number;
    Nombre: string;
    Email: string;
    Rol: string;
    Creditos_Disponibles: number;
    Id_Profesor: number;
    Id_Estudiante: number;
    Token: string;
  }
  
  export interface UserResponse {
    Data: UserResponseData;
    Success: boolean;
    Message: string;
    Errors: string[];
    ValidationErrors?: any;
  }