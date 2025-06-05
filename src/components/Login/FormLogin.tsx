import { useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserLoginForm } from "../../types/User";
import { useAppStore } from "../../store/UseAppStore";

const initialState: UserLoginForm = {
    Email: '',
    Password: ''
}

const FormLogin = () => {
    const {loginUser, isAuthenticated} = useAppStore()
    const [form, setForm] = useState(initialState)
    const navigate = useNavigate()

    useEffect(() => {
        if(isAuthenticated){
            navigate('/dashboard')
        }
    }, [isAuthenticated])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        loginUser(form)
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
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Contraseña"
                        value={form.Password}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Iniciar sesión
                </button>
            </div>

            <div>
                <p className="text-sm text-center text-gray-500">
                    ¿No tienes cuenta?
                    <button onClick={() => navigate('/register')}  className="font-medium text-blue-600 hover:text-blue-500">
                        Registrate
                    </button>
                </p>
            </div>
        </form>
    )
}

export default FormLogin