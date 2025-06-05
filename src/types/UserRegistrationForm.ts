


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