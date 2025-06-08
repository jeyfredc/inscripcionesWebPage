import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { UserLoginForm } from "../../types/User";
import { useAppStore } from "../../store/UseAppStore";

const initialState: UserLoginForm = {
    Email: '',
    Password: ''
}

const FormLogin = () => {
    const { loginUser, isAuthenticated } = useAppStore();
    const [form, setForm] = useState(initialState);
    const navigate = useNavigate();

    const { mutate: login, isPending } = useMutation({
        mutationFn: async (credentials: UserLoginForm) => {
            return loginUser(credentials);
        },
        onSuccess: (data) => {
            if (data?.Success) {
                navigate('/dashboard');
                toast.success(data.Message);
            } else {
                toast.error(data?.Message || 'Error en el inicio de sesión');
            }
        },
        onError: (error) => {
            console.error('Login error:', error);
            toast.error('Error al iniciar sesión. Intente de nuevo.');
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(form);
    };

    if (isAuthenticated) {
        navigate('/dashboard');
        return null;
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
                <div>
                    <label htmlFor="student-email" className="sr-only">
                        Correo electrónico
                    </label>
                    <input
                        id="student-email"
                        name="Email"
                        type="email"
                        autoComplete="email"
                        required
                        disabled={isPending}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Correo electrónico"
                        value={form.Email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="student-password" className="sr-only">
                        Contraseña
                    </label>
                    <input
                        id="student-password"
                        name="Password"
                        type="password"
                        autoComplete="current-password"
                        required
                        disabled={isPending}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Contraseña"
                        value={form.Password}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isPending}
                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        isPending ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isPending ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Iniciando sesión...
                        </span>
                    ) : 'Iniciar sesión'}
                </button>
            </div>

            <div>
                <p className="text-sm text-center text-gray-500">
                    ¿No tienes cuenta?
                    <button 
                        type="button"
                        onClick={() => navigate('/register')}  
                        className="font-medium text-blue-600 hover:text-blue-500 ml-1"
                        disabled={isPending}
                    >
                        Regístrate
                    </button>
                </p>
            </div>
        </form>
    );
}

export default FormLogin;