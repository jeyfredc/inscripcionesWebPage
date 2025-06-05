import React from 'react'
import Menu from '../Menu/Menu';
import { Outlet } from 'react-router-dom';
import MenuItem from './MenuItem';
import { useAppStore } from '../../store/UseAppStore';

const MenuDashboard = ({children}: {children: React.ReactNode}) => {

  const {dataUser} = useAppStore()
  console.log(dataUser);
  
  const [activeTab, setActiveTab] = React.useState(() => {
    switch(dataUser?.Rol) {
      case 'Estudiante': return 'estudiantes';
      case 'Profesor': return 'profesores';
      case 'Administrador': return 'administrador';
      default: return 'estudiantes'; 
    }
  });    
  return (
    <div className="flex h-screen bg-gray-100">

    <div className="w-64 bg-white shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Menú Principal</h2>
      </div>
      
      <div className="flex border-b">
      {dataUser?.Rol === 'Estudiante' && (
            <button
              className={`flex-1 py-2 px-4 font-medium text-sm ${activeTab === 'estudiantes' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('estudiantes')}
            >
              Estudiante
            </button>
          )}
          
          {dataUser?.Rol === 'Profesor' && (
            <button
              className={`flex-1 py-2 px-4 font-medium text-sm ${activeTab === 'profesores' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('profesores')}
            >
              Profesor
            </button>
          )}
          
          {dataUser?.Rol === 'Administrador' && (
            <button
              className={`flex-1 py-2 px-4 font-medium text-sm ${activeTab === 'administrador' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('administrador')}
            >
              Administrador
            </button>
          )}
    </div>

 
      <nav className="mt-2">
        {activeTab === 'estudiantes' && (
          <>
            <MenuItem 
              to="/dashboard/inscripcion" 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
              text="Inscripción de Materias"
            />
            <MenuItem 
              to="/dashboard/mis-materias" 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
              text="Mis Materias"
            />
          </>
        )}
        {activeTab === 'profesores' && (
          <>
            <MenuItem 
              to="/dashboard/registro-clase" 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
              text="Registro de Clase"
            />
            <MenuItem 
              to="/dashboard/ver-materias" 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
              text="Ver Materias"
            />
          </>
        )}
        {activeTab === 'administrador' && (
          <>
            <MenuItem 
              to="/dashboard/admin" 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
              text="Admin"
            />
          </>
        )}
      </nav>
    </div>

    <div className="flex-1 flex flex-col overflow-hidden">
      <Menu />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
      {children || <Outlet />} {/* Aquí se renderizarán los componentes de las rutas anidadas */}
        </main>
    </div>
  </div>
  )
}



export default MenuDashboard