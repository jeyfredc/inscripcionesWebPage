import React, { useEffect, useState } from 'react';
import { getCourses } from '../../../api/ProfesorApi';
import { TeacherResponseData } from '../../../types/Teacher';

const RegistrarClase = () => {
  const [courses, setCourses] = useState<TeacherResponseData[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // TODO: Replace with actual teacher ID from auth context or props
        const teacherId = 1; // This should come from your auth context
        const response = await getCourses(teacherId);
        
        if (response.Success && response.Data) {
          setCourses(response.Data);
        } else {
          setError(response.Message || 'Error al cargar las materias');
        }
      } catch (err) {
        setError('Error al conectar con el servidor');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!selectedCourse) {
      setError('Por favor seleccione una materia');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: Replace with actual registration API call
      console.log('Registering for course:', selectedCourse);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message or redirect
      alert('¡Registro exitoso!');
      // Optionally reset form
      // setSelectedCourse('');
    } catch (err) {
      console.error('Error al registrar:', err);
      setError('Error al procesar el registro');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

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
          onChange={handleCourseChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Seleccione una materia --</option>
          {courses.map((course) => (
            <option 
              key={`${course.CodigoMateria}-${course.Horario}`} 
              value={course.CodigoMateria}
            >
              {course.NombreMateria} - {course.Horario} (Cupos: {course.CupoDisponible}/{course.CupoMaximo})
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h3 className="text-lg font-medium text-blue-800">Información de la materia seleccionada</h3>
          {courses
            .filter(course => course.CodigoMateria === selectedCourse)
            .map(course => (
              <div key={course.CodigoMateria} className="mt-2">
                <p><span className="font-medium">Código:</span> {course.CodigoMateria}</p>
                <p><span className="font-medium">Profesor:</span> {course.NombreProfesor}</p>
                <p><span className="font-medium">Horario:</span> {course.Horario}</p>
                <p><span className="font-medium">Cupos disponibles:</span> {course.CupoDisponible} de {course.CupoMaximo}</p>
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