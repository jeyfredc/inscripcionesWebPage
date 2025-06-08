import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppStore } from '../../../store/UseAppStore';
import { CourseInscription, CoursesAvailableResponse, CoursesAvailableData } from '../../../types/Courses';
import Warning from '../../../components/Warning/Warning';
import Spinner from '../../../components/Spinner/Spinner';
import { toast } from 'react-toastify';
import { getCoursesAvailable, saveCourses } from '../../../api/CourseApi';

const CoursesInscription = () => {
  const { dataUser, creditStudent, getCredits } = useAppStore();
  const [selectedMaterias, setSelectedMaterias] = useState<string[]>([]);
  const [formCourses, setFormCourses] = useState<CourseInscription>([]);
  const queryClient = useQueryClient();

  const { 
    data: availableCourses = [], 
    isLoading, 
    error 
  } = useQuery<CoursesAvailableResponse, Error, CoursesAvailableData[]>({
    queryKey: ['availableCourses'],
    queryFn: getCoursesAvailable,
    select: (response) => response.Data || []
  });

  const { mutate: handleInscription, isPending: isSubmitting } = useMutation({
    mutationFn: (courses: CourseInscription) => saveCourses(courses),
    onSuccess: async (response) => {
      if (response.Success) {
        toast.success('Inscripción exitosa');
        await queryClient.invalidateQueries({ queryKey: ['availableCourses'] });
        if (dataUser?.Id) {
          await getCredits(Number(dataUser.Id));
        }

        setSelectedMaterias([]);
        setFormCourses([]);
      } else {
        toast.error(response.Message || 'Error al realizar la inscripción');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const handleCheckboxChange = (codigoMateria: string) => {
    setSelectedMaterias(prev => {
      const newSelected = prev.includes(codigoMateria)
        ? prev.filter(id => id !== codigoMateria)
        : [...prev, codigoMateria];
      return newSelected;
    });
  
    setFormCourses(prev => {
      if (prev.some(item => item.CodigoMateria === codigoMateria)) {
        return prev.filter(item => item.CodigoMateria !== codigoMateria);
      }
  
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
      toast.error('No se pudo identificar al estudiante');
      return;
    }

    if (formCourses.length === 0) {
      toast.error('Por favor selecciona al menos una materia');
      return;
    }

    handleInscription(formCourses);
  };

  if (isLoading) {
    return <Spinner text="Cargando materias disponibles..." />;
  }

  if (error) {
    return <Warning message="Error al cargar las materias disponibles" type="error" />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inscripción de Materias</h1>
      {creditStudent === 1 && (
        <Warning 
          message="Lo sentimos, ya no puedes inscribirte en más materias ya que no tienes créditos disponibles" 
          type="error" 
        />
      )}
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
                    disabled={materia.CupoDisponible === 0 || creditStudent === 1}
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
                  disabled={formCourses.length === 0 || isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Procesando...' : `Confirmar Inscripción (${formCourses.length})`}
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