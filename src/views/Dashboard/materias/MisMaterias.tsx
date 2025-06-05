// src/views/Dashboard/materias/MisMaterias.tsx
import React from 'react';

const MisMaterias = () => {
  // Datos de ejemplo - reemplazar con llamada a API
  const misMaterias = [
    { id: '1', nombre: 'Matemáticas', horario: 'Lunes 8:00 - 10:00', profesor: 'Dr. Pérez' },
    { id: '2', nombre: 'Programación', horario: 'Martes 10:00 - 12:00', profesor: 'Ing. Martínez' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mis Materias Inscritas</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {misMaterias.length > 0 ? (
            misMaterias.map((materia) => (
              <li key={materia.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{materia.nombre}</h3>
                    <p className="text-sm text-gray-500">{materia.horario}</p>
                    <p className="text-sm text-gray-500">Profesor: {materia.profesor}</p>
                  </div>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
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

export default MisMaterias;