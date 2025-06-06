// src/views/Dashboard/materias/MisMaterias.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../../store/UseAppStore';

const MyCourses = () => {


  const hasFetched = useRef(false);

  const { getCoursesById, studentId, coursesAssigned, deleteCourses } = useAppStore();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    (async () => {
      setIsLoading(true);
      try {
        const response = await getCoursesById(studentId || 0);
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
  }, [getCoursesById, studentId]);


  const onRemoveCourse = async (codigoMateria: string) => {
    try {
      await deleteCourses([
        {
          IdEstudiante: studentId || 0,
          CodigoMateria: codigoMateria
        }
      ]);
    } catch (error) {
      console.error('Error al eliminar la materia:', error);
    }
  };

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
                    <h3 className="text-lg font-medium text-gray-900">{materia.Materia} - {materia.Codigomateria}</h3>
                    <p className="text-sm text-gray-500">{materia.Horario}</p>
                    <p className="text-sm text-gray-500">Profesor: {materia.Profesor}</p>
                  </div>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium" onClick={() => onRemoveCourse(materia.Codigomateria)}>
                    Dar de baja
                  </button>
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