
import { useAppStore } from '../../store/UseAppStore';

const Menu = () => {
  const {onLogout, dataUser} = useAppStore()
  
  
  return (
    <header className="bg-slate-950 shadow-sm">
   
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-white">Sistema de Inscripciones </h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="flex items-center text-sm text-white hover:text-gray-900 focus:outline-none"
              id="user-menu"
              aria-haspopup="true"
            >
              <span className="sr-only">Abrir menú de usuario </span>
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                JC
              </div>
              <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-900">
                {dataUser?.Nombre}
              </span>

            </button>
          </div>
          <button
            className="flex items-center text-sm text-red-600 hover:text-red-800"
            onClick={onLogout}
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Menu;