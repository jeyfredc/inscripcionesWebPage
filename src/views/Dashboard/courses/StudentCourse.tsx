import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store/UseAppStore';


const StudentCourse = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();


  const { classMatesStudents } = useAppStore()
  
  const currentClassMates = classMatesStudents.filter((student) => student.CodigoMateria === courseId)
  
  const courseName = currentClassMates[0]?.Materia || 'Curso'


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
          {currentClassMates.length > 0 ? (
            currentClassMates.map((student) => (
              <li key={student.CodigoMateria} className="px-6 py-4 hover:bg-gray-50">
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