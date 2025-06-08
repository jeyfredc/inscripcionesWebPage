import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppStore } from '../../../store/UseAppStore';
import InscriptionCourseTeacher from '../../../components/InscriptionCourseTeacher/InscriptionCourseTeacher';
import { FormAssignCourse, CourseWithoutAssignData, CoursesAndSchedules } from '../../../types/Courses';
import { getCourseWithoutAssign, AssignCourse } from '../../../api/CourseApi';
import { ApiResponse } from '../../../types/api';
import Spinner from '../../../components/Spinner/Spinner';
import { toast } from 'react-toastify';

interface ScheduleData {
  dia: string;
  horario: string;
  grupo: string;
}

const RegistrarClase = () => {
  const { dataUser } = useAppStore();
  const queryClient = useQueryClient();
  
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    dia: 'Lunes',
    horario: '6:00 PM - 8:00 PM',
    grupo: 'A'
  });


  const { 
    data: coursesData, 
    isLoading: isLoadingCourses, 
    error: coursesError 
  } = useQuery<ApiResponse<CourseWithoutAssignData[]>>({
    queryKey: ['coursesWithoutAssign'],
    queryFn: getCourseWithoutAssign,
    staleTime: 5 * 60 * 1000, 
  });

  const assignCourseMutation = useMutation({
    mutationFn: (registrationData: FormAssignCourse) => AssignCourse(registrationData),
    onSuccess: (data: ApiResponse<CoursesAndSchedules>) => {
      if(!data.Success){
        toast.error(data.Message);
        
      }else{
        toast.success(data.Message);
      }
      
      queryClient.invalidateQueries({ queryKey: ['coursesWithoutAssign'] });
      queryClient.invalidateQueries({ queryKey: ['teacherCourses'] });
      
      setSelectedCourse('');
      setScheduleData({
        dia: 'Lunes',
        horario: '6:00 PM - 8:00 PM',
        grupo: 'A'
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const handleScheduleChange = (data: ScheduleData) => {
    setScheduleData(data);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!selectedCourse) {
      assignCourseMutation.reset();
      return;
    }

    const courseData = coursesData?.Data?.find((c: CourseWithoutAssignData) => c.Codigo === selectedCourse);
    if (!courseData) {
      assignCourseMutation.reset();
      return;
    }

    const registrationData: FormAssignCourse = {
      ProfesorId: Number(dataUser?.Id_Profesor), 
      CodigoMateria: selectedCourse,
      Horario: `${scheduleData.dia} ${scheduleData.horario}`,
      Grupo: scheduleData.grupo
    };

    assignCourseMutation.mutate(registrationData);
  };

  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Registrar Nueva Clase</h1>

      {isLoadingCourses ? (
        <div className="flex justify-center py-8">
          <Spinner text="Cargando materias disponibles..." />
        </div>
      ) : coursesError ? (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error al cargar las materias disponibles. Por favor, intente de nuevo más tarde.
        </div>
      ) : (
        <div className="mb-6">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Seleccione una materia
          </label>
          <select
            id="subject"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={assignCourseMutation.isPending}
          >
            <option value="">-- Seleccione una materia --</option>
            {coursesData?.Data?.map((course: CourseWithoutAssignData) => (
              <option
                key={`${course.Codigo}-${course.Nombre}`}
                value={course.Codigo}
              >
                {course.Nombre} (Cupos: {course.Cupo_Disponible}/{course.Cupo_Maximo})
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedCourse && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          {coursesData?.Data
            ?.filter((course: CourseWithoutAssignData) => course.Codigo === selectedCourse)
            .map((course: CourseWithoutAssignData) => (
              <div key={course.Codigo}>
                <h3 className="text-lg font-semibold mb-2">Detalles de la materia</h3>
                <p><span className="font-medium">Código:</span> {course.Codigo}</p>
                <p><span className="font-medium">Nombre:</span> {course.Nombre}</p>
                <p><span className="font-medium">Cupos disponibles:</span> {course.Cupo_Disponible} de {course.Cupo_Maximo}</p>
                
                <InscriptionCourseTeacher 
                  onSelectionChange={handleScheduleChange}
                  initialValues={scheduleData}
                />
                
                <div className="mt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={assignCourseMutation.isPending}
                    className={`px-4 py-2 rounded-md text-white font-medium ${
                      assignCourseMutation.isPending
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {assignCourseMutation.isPending ? (
                      <span className="flex items-center">
                          ...Procesando
                      </span>
                    ) : 'Registrar en esta clase'}
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RegistrarClase;