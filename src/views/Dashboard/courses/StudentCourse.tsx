import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getClassMatesById } from '../../../api/StudentApi';
import { useAppStore } from '../../../store/UseAppStore';
import { toast } from 'react-toastify';
import { ClassMate } from '../../../types/Student';

const StudentCourse = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { dataUser } = useAppStore();

  // Obtener los compañeros de clase usando React Query
  const { data: classMatesResponse, isLoading, error } = useQuery({
    queryKey: ['classMates', courseId],
    queryFn: async () => {
      if (!dataUser?.Id_Estudiante || !courseId) {
        throw new Error('ID de estudiante o curso no válido');
      }
      const response = await getClassMatesById(dataUser.Id_Estudiante, courseId);
      if (!response.Success) {
        throw new Error(response.Message || 'Error al cargar los compañeros');
      }
      return response.Data;
    },
    enabled: !!dataUser?.Id_Estudiante && !!courseId,
  });

  // Manejar errores
  if (error) {
    toast.error('Error al cargar los compañeros de clase');
    console.error('Error al cargar los compañeros:', error);
  }

  const courseName = classMatesResponse?.[0]?.Materia || 'Curso';

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button     
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-600 hover:text-gray-800"
          aria-label="Volver atrás"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">
          Compañeros de Clase - {courseName}
        </h1>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {classMatesResponse && classMatesResponse.length > 0 ? (
            classMatesResponse.map((student: ClassMate) => (
              <li key={student.Matricula} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {student.NombreEstudiante.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <span className="text-sm text-gray-500">Matricula: {student.Matricula}</span>
                    <h3 className="text-sm font-medium text-gray-900">
                      {student.NombreEstudiante} 
                    </h3>
                    <p className="text-sm text-gray-500">{student.Email}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-6 py-4 text-center text-gray-500">
              No hay estudiantes inscritos en este curso.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StudentCourse;