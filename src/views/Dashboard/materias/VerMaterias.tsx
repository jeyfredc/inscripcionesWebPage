// src/views/Dashboard/materias/VerMaterias.tsx
import React, { useEffect } from 'react';
import { useAppStore } from '../../../store/UseAppStore';

const VerMaterias = () => {
  
  const {coursesByTeacher, getCoursesByTeacher, dataUser} = useAppStore()

console.log(coursesByTeacher);

  useEffect(() => {
    if(dataUser){
      getCoursesByTeacher(dataUser.Id)
    }
  }, [dataUser])

  const cupoMateria = (cupoMaximo:number, cupoDisponible:number) => {
    if(cupoDisponible === 0){
      return 'Llena'
    }else if(cupoDisponible === cupoMaximo){
      return 'Activa'
    }else{
      return 'Activa'
    }
  }
  


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
            {coursesByTeacher.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No hay materias inscritas para el profesor {dataUser?.Nombre}
                </td>
              </tr>
            )}
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
                    {materia.CupoMaximo}/{materia.CupoDisponible} 
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${materia.CupoMaximo === materia.CupoDisponible ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {materia.CupoMaximo === materia.CupoDisponible ? 'Activa' : 'Llena'}
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

export default VerMaterias;