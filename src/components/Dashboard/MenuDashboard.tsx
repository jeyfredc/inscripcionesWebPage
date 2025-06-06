import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Menu from '../Menu/Menu';
import MenuItem from './MenuItem';
import { useAppStore } from '../../store/UseAppStore';

const MenuDashboard = ({ children }: { children: React.ReactNode }) => {
  const { dataUser } = useAppStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    switch (dataUser?.Rol) {
      case 'Estudiante': return 'estudiantes';
      case 'Profesor': return 'profesores';
      case 'Administrador': return 'administrador';
      default: return 'estudiantes';
    }
  });

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Manejar cambio de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Overlay para móvil */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Menú lateral - Desktop */}
      <div className={`fixed md:relative z-30 transform ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 h-full bg-white shadow-lg flex-shrink-0`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Menú Principal</h2>
        </div>
        
        <div className="flex border-b">
          {dataUser?.Rol === 'Estudiante' && (
            <button
              className={`flex-1 py-3 px-4 font-medium text-sm ${
                activeTab === 'estudiantes' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('estudiantes')}
            >
              Estudiante
            </button>
          )}
          
          {dataUser?.Rol === 'Profesor' && (
            <button
              className={`flex-1 py-3 px-4 font-medium text-sm ${
                activeTab === 'profesores' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('profesores')}
            >
              Profesor
            </button>
          )}
          
          {dataUser?.Rol === 'Administrador' && (
            <button
              className={`flex-1 py-3 px-4 font-medium text-sm ${
                activeTab === 'administrador' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('administrador')}
            >
              Administrador
            </button>
          )}
        </div>

        <nav className="overflow-y-auto h-[calc(100%-120px)]">
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
              to="/dashboard/registro-materias-profesores" 
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
              text="Registrar Nueva Materia"
            />
          <MenuItem 
              to="/dashboard/listar-materias-profesores" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>}
              text="Listar materias"
            />
            </>
          )}
          
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Botón de menú móvil */}

        <Menu />
        <div className="md:hidden bg-white shadow-sm border-b border-gray-200">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-4 text-gray-500 hover:text-gray-600 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default MenuDashboard;