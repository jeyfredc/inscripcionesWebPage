
import { useAppStore } from '../../store/UseAppStore';

const Menu = () => {
  const { onLogout, dataUser, creditStudent } = useAppStore();




  return (
    <header className="bg-slate-950 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between h-16">
          {/* Logo y título - Solo visible en desktop */}
          <div className="hidden sm:flex items-center">
            <h1 className="text-lg sm:text-xl font-semibold text-white whitespace-nowrap">
              Sistema de Inscripciones
            </h1>
          </div>

          {/* Información del usuario - Solo visible en móvil */}
          <div className="flex items-center sm:hidden">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm mr-2">
                {dataUser?.Nombre?.charAt(0) || 'U'}
              </div>
              <div className="text-white text-sm">
                <div className="font-medium">{dataUser?.Nombre}</div>
                {dataUser?.Rol === 'Estudiante' && (
                  <div className="text-xs text-gray-300">
                    Créditos: <b>{dataUser?.Creditos_Disponibles ?? 'Cargando...'}</b>

                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Menú desktop */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-2 md:space-x-4">
            {dataUser?.Rol === 'Estudiante' && (
              <span className="text-white text-sm bg-blue-900/50 px-3 py-1 rounded-full">
                Créditos: <b>{dataUser.Creditos_Disponibles ?? 'Cargando...'}</b>

              </span>
            )}

            <div className="relative">
              <button
                className="flex items-center text-sm text-white hover:bg-slate-800 rounded-full p-1"
                id="user-menu"
                aria-haspopup="true"
              >
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm">
                  {dataUser?.Nombre?.charAt(0) || 'U'}
                </div>
                <span className="ml-2 text-sm font-medium text-white hidden md:inline">
                  {dataUser?.Nombre}
                </span>

              </button>
            </div>

            <button
              onClick={onLogout}
              className="text-gray-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              title="Cerrar sesión"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="">Salir</span>
            </button>
          </div>

          {/* Botón de Cerrar sesión en móvil */}
          <div className="absolute right-0 mt-3 mr-2  w-40 rounded-md bg-red-900 ring-1 focus:outline-none sm:hidden z-50">
            <div className="bg-red-700" >
              <button
                onClick={onLogout}
                className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-red-700 hover:text-white"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
        </div>
      </div>
    </header>
  );
};

export default Menu;