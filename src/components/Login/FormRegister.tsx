import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { UserRegistrationForm } from '../../types/User'
import { useAppStore } from '../../store/UseAppStore'
import ValidationError from './ValidationError'
const initialState:UserRegistrationForm = {
    Nombre: '',
    Email: '',
    Password: '',
    RolId: 0
}

const FormRegister = () => {

    const { createUser, successCreateUser, resetSuccessCreateUser    } = useAppStore()
    const [formState, setFormState] = useState<UserRegistrationForm>(initialState)
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [errors, setErrors] = useState<string[]>([]);
    const [touched, setTouched] = useState({
        confirmPassword: false
    });

    const navigate = useNavigate()
  const [isTeacher, setIsTeacher] = useState<boolean>(false)

  useEffect(() => {
    setFormState(prev => ({ 
        ...prev,
        RolId: isTeacher ? 2 : 1
    }))

    if(successCreateUser){
        navigate('/')
        resetSuccessCreateUser()
    }
}, [isTeacher, successCreateUser])


const validatePasswordConfirmation = () => {
    if (formState.Password !== confirmPassword) {
        setErrors(['Las contraseñas no coinciden']);
    } else {
        setErrors([]);
    }
};

const handleConfirmPasswordBlur = () => {
    setTouched(prev => ({ ...prev, confirmPassword: true }));
    validatePasswordConfirmation();
};

const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    // Solo validar si ya se ha tocado el campo
    if (touched.confirmPassword) {
        if (value && formState.Password !== value) {
            setErrors(['Las contraseñas no coinciden']);
        } else {
            setErrors([]);
        }
    }
};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
    
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log(formState)
      if(formState.Password !== confirmPassword){
        return
      }
    createUser(formState)

  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm space-y-4">
        <div className="flex items-center justify-center py-2">
          <span className="text-sm font-medium text-gray-700 mr-2">Estudiante</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isTeacher}
              onChange={(e) => setIsTeacher(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">Profesor</span>
          </label>
        </div>
        <div>
          <label htmlFor="name" className="sr-only">
            Nombre completo
          </label>
          <input
            id="name"
            name="Nombre"
            type="text"
            autoComplete="name"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Nombre completo"
            value={formState.Nombre}
            onChange={handleChange}
          />
        </div>


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
            value={formState.Email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <input
            id="password"
            name="Password"
            type="password"
            autoComplete="password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Contraseña"
            value={formState.Password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            Confirmar contraseña
          </label>
          <input
        id="confirmPassword"
        name="ConfirmPassword"
        type="password"
        autoComplete="new-password"
        required
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
            errors.length > 0 ? 'border-red-500' : 'border-gray-300'
        } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        onBlur={handleConfirmPasswordBlur}
    />
    {touched.confirmPassword && errors.length > 0 && (
        <ValidationError errors={errors} />
    )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Registrarse como {isTeacher ? 'Profesor' : 'Estudiante'}
        </button>
      </div>

      <div>
        <p className="text-sm text-center text-gray-500">
          ¿Ya tienes una cuenta?{' '}
          <button onClick={() => navigate('/')} className="font-medium text-blue-600 hover:text-blue-500">
            Inicia sesión
          </button>
        </p>
      </div>
    </form>
  )
}

export default FormRegister