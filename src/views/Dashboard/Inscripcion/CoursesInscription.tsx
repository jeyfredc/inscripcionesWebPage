import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../../store/UseAppStore';
import { CourseInscription } from '../../../types/Courses';

const CoursesInscription = () => {
  const { getCoursesAvailable, availableCourses, dataUser,inscriptionCourses } = useAppStore();
  const [selectedMaterias, setSelectedMaterias] = useState<string[]>([]);
  const [formCourses, setFormCourses] = useState<CourseInscription>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasFetched = useRef(false);

  // Cargar materias disponibles al montar el componente
  useEffect(() => {
    if (hasFetched.current) return;
    
    hasFetched.current = true;
    
    (async () => {
      setIsLoading(true);
      try {
        const response = await getCoursesAvailable();
        if (!response.Success) {
          setError('No se pudieron cargar las materias disponibles');
          console.error('Error al cargar materias:', response.Message);
        }
      } catch (err) {
        setError('Error de conexión al cargar las materias');
        console.error('Error inesperado:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [getCoursesAvailable]);

  const handleCheckboxChange = (codigoMateria: string) => {
    setSelectedMaterias(prev => {
      const newSelected = prev.includes(codigoMateria)
        ? prev.filter(id => id !== codigoMateria)
        : [...prev, codigoMateria];
      return newSelected;
    });
  
    setFormCourses(prev => {
      // Si ya existe, lo eliminamos
      if (prev.some(item => item.CodigoMateria === codigoMateria)) {
        return prev.filter(item => item.CodigoMateria !== codigoMateria);
      }
  
      // Si no existe, lo agregamos
      return [
        ...prev,
        {
          IdEstudiante: Number(dataUser?.Id),
          CodigoMateria: codigoMateria,
        }
      ];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataUser?.Id) {
      alert('No se pudo identificar al estudiante');
      return;
    }

    if (formCourses.length === 0) {
      alert('Por favor selecciona al menos una materia');
      return;
    }

    console.log('Datos a enviar:', {formCourses});
    inscriptionCourses(formCourses)
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Inscripción de Materias</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Inscripción de Materias</h1>
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 ">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inscripción de Materias</h1>
      {dataUser?.Creditos_Disponibles ===1 &&
                  <div className="ml-3 flex items-center bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-sm text-red-700 font-semibold">Lo sentimos, ya no puedes inscribirte en más materias ya que no tienes créditos disponibles</p>
                </div>
      }
      <div className="bg-white p-6 rounded-lg shadow">
        {availableCourses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No hay materias disponibles para inscribir en este momento.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {availableCourses.map((materia) => (
                
                <div key={materia.CodigoMateria} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    id={`materia-${materia.CodigoMateria}`}
                    checked={selectedMaterias.includes(materia.CodigoMateria)}
                    onChange={() => handleCheckboxChange(materia.CodigoMateria)}
                    disabled={materia.CupoDisponible === 0 || dataUser?.Creditos_Disponibles === 1}
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <label htmlFor={`materia-${materia.CodigoMateria}`} className="ml-3 flex-1">
                    <div className="font-medium text-gray-900">{materia.Materia}</div>
                    <div className="text-sm text-gray-500">
                      {materia.Horario} • {materia.CupoDisponible} cupos disponibles
                    </div>
                    <div className="text-sm text-gray-500">
                      Profesor: {materia.NombreProfesor} • Créditos: {materia.Creditos}
                    </div>
                  </label>
                </div>
              ))}
            </div>
            {availableCourses.length > 0 && (
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={formCourses.length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Confirmar Inscripción ({formCourses.length})
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default CoursesInscription;