import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppStore } from '../../../store/UseAppStore';
import { toast } from 'react-toastify';
import { getCoursesById, getClassMatesById } from '../../../api/StudentApi';
import { deleteCourses } from '../../../api/CourseApi';


interface Course {
  Codigomateria: string;
  Materia: string;
  Horario: string;
  Profesor: string;
}

const MyCourses = () => {
  const { dataUser, getCredits, setClassMates } = useAppStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { 
    data: coursesAssigned = [], 
    isLoading, 
    error,
    refetch
  } = useQuery<Course[]>({
    queryKey: ['assigned-courses', dataUser?.Id_Estudiante],
    queryFn: async () => {
      if (!dataUser?.Id_Estudiante) {
        console.log('No student ID available');
        return [];
      }
      console.log('Fetching courses for student:', dataUser.Id_Estudiante);
      const response = await getCoursesById(dataUser.Id_Estudiante);
      if (!response.Success) {
        console.error('Failed to fetch courses:', response.Message);
        throw new Error(response.Message || 'Error al cargar las materias');
      }
      console.log('Courses fetched successfully:', response.Data);
      return response.Data || [];
    },
    enabled: !!dataUser?.Id_Estudiante,
    retry: 1,
    refetchOnMount: 'always',
    staleTime: 0,
    retryOnMount: true
  });

  const { mutate: removeCourse } = useMutation({
    mutationFn: async (codigoMateria: string) => {
      if (!dataUser?.Id_Estudiante) {
        throw new Error('ID de estudiante no disponible');
      }
      const response = await deleteCourses([{
        IdEstudiante: dataUser.Id_Estudiante,
        CodigoMateria: codigoMateria
      }]);
      
      if (!response.Success) {
        throw new Error(response.Message || 'Error al eliminar la materia');
      }
      return response;
    },
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ 
          queryKey: ['assigned-courses', dataUser?.Id_Estudiante],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({ 
          queryKey: ['availableCourses'],
          refetchType: 'active',
        })
      ]);
      
      if (dataUser?.Id) {
        console.log('Updating credits for user:', dataUser.Id);
        await getCredits(Number(dataUser.Id));
      }
      
      await refetch();
      
      toast.success(data.Message || 'Materia eliminada correctamente');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al eliminar la materia');
      console.error('Error al eliminar la materia:', error);
    }
  });

  const onViewClass = async (codigoMateria: string) => {
    navigate(`/dashboard/mis-materias/${codigoMateria}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message || 'No se pudieron cargar las materias. Intente de nuevo más tarde.'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mis Materias Inscritas</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {coursesAssigned.length > 0 ? (
            coursesAssigned.map((materia) => (
              <li key={materia.Codigomateria} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {materia.Materia} - {materia.Codigomateria}
                    </h3>
                    <p className="text-sm text-gray-500">{materia.Horario}</p>
                    <p className="text-sm text-gray-500">Profesor: {materia.Profesor}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                      onClick={() => removeCourse(materia.Codigomateria)}
                    >
                      Dar de baja
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => onViewClass(materia.Codigomateria)}
                    >
                      Grupo clase
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-6 py-4 text-center text-gray-500">
              No estás inscrito en ninguna materia actualmente.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyCourses;