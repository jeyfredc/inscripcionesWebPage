// views/Dashboard/Inscripcion/RegistrarClase.tsx
import React, { useState, useRef, useEffect } from 'react';
import { getCourses } from '../../../api/ProfesorApi';
import { TeacherResponseData } from '../../../types/Teacher';
import { useAppStore } from '../../../store/UseAppStore';
import InscriptionCourseTeacher from '../../../components/InscriptionCourseTeacher/InscriptionCourseTeacher';
import { FormAssignCourse } from '../../../types/Courses';

interface ScheduleData {
  dia: string;
  horario: string;
  grupo: string;
}

const RegistrarClase = () => {
  const { getCourseWithoutAssign, newCourse ,dataUser , assignCourse} = useAppStore();
  const hasFetched = useRef(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    dia: 'Lunes',
    horario: '6:00 PM - 8:00 PM',
    grupo: 'A'
  });

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    (async () => {
      try {
        await getCourseWithoutAssign();
      } catch (error) {
        console.error('Error al cargar las materias:', error);
        setError('Error al cargar las materias disponibles');
      }
    })();
  }, [getCourseWithoutAssign]);

  const handleScheduleChange = (data: ScheduleData) => {
    setScheduleData(data);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!selectedCourse) {
      setError('Por favor seleccione una materia');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const courseData = newCourse.find(c => c.Codigo === selectedCourse);
      
      if (!courseData) {
        throw new Error('No se encontró la información de la materia seleccionada');
      }
      const registrationData: FormAssignCourse = {
        ProfesorId: Number(dataUser?.Id_Profesor), 
        CodigoMateria: selectedCourse,
        Horario: `${scheduleData.dia} ${scheduleData.horario}`,
        Grupo: scheduleData.grupo
      };

      await assignCourse(registrationData);
      setSelectedCourse('');
      
      setScheduleData({
        dia: 'Lunes',
        horario: '6:00 PM - 8:00 PM',
        grupo: 'A'
      });
    } catch (err) {
      setError('Ocurrió un error al procesar la inscripción');
      console.error('Error en el registro:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Registrar Nueva Clase</h1>

      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          Seleccione una materia
        </label>
        <select
          id="subject"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={isSubmitting}
        >
          <option value="">-- Seleccione una materia --</option>
          {newCourse.map((course) => (
            <option
              key={`${course.Codigo}-${course.Nombre}`}
              value={course.Codigo}
            >
              {course.Nombre} (Cupos: {course.Cupo_Disponible}/{course.Cupo_Maximo})
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {selectedCourse && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          {newCourse
            .filter((course) => course.Codigo === selectedCourse)
            .map((course) => (
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
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-md text-white font-medium ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
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