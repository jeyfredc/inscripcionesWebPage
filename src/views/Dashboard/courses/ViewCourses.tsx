import { useAppStore } from '../../../store/UseAppStore';
import { useQuery } from '@tanstack/react-query';
import { getCourses } from '../../../api/ProfesorApi';
import { ApiResponse } from '../../../types/api';
import { TeacherResponseData } from '../../../types/Teacher';
import Spinner from '../../../components/Spinner/Spinner';


const ViewCourses = () => {
  const { dataUser } = useAppStore();

  const fetchTeacherCourses = async (): Promise<ApiResponse<TeacherResponseData[]>> => {
    if (!dataUser) {
      return { Data: [], Success: true, Message: 'No hay usuario autenticado', Errors: [] };
    }
    try {
      return await getCourses(dataUser.Id);
    } catch (error) {
      return { 
        Data: [], 
        Success: false, 
        Message: 'Error al cargar las materias', 
        Errors: [error instanceof Error ? error.message : 'Error desconocido'] 
      };
    }
  };

  const {
    data: coursesResponse,
    isLoading,
    error,
    isError,
  } = useQuery<ApiResponse<TeacherResponseData[]>, Error>({
    queryKey: ['teacherCourses', dataUser?.Id],
    queryFn: fetchTeacherCourses,
    enabled: !!dataUser?.Id,
    staleTime: 0,  
    refetchOnMount: true, 
    refetchOnWindowFocus: true, 
  });
  const coursesByTeacher = coursesResponse?.Data || [];

  const cupoMateria = ( cupoDisponible: number) => {
    if (cupoDisponible === 0) {
      return 'Llena';
    }
    return 'Activa';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Todas las Materias</h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Materia
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Horario
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cupos
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <Spinner text='Cargando materias...' />
                  </div>
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-red-500">
                  Error al cargar las materias: {error?.message || 'Error desconocido'}
                </td>
              </tr>
            ) : coursesByTeacher.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No hay materias inscritas para el profesor {dataUser?.Nombre}
                </td>
              </tr>
            ) : null}
            {coursesByTeacher.map((materia) => (
              <tr key={materia.CodigoMateria} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{materia.NombreMateria}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{materia.Horario}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {materia.CupoDisponible}/{materia.CupoMaximo}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrasp">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${cupoMateria(materia.CupoDisponible) === 'Activa' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {cupoMateria(materia.CupoDisponible)}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCourses;