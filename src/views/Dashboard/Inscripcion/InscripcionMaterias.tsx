// src/views/Dashboard/Inscripcion/InscripcionMaterias.tsx
import React, { useState } from 'react';

const InscripcionMaterias = () => {
  const [selectedMaterias, setSelectedMaterias] = useState<string[]>([]);
  
  // Datos de ejemplo - reemplazar con llamada a API
  const materiasDisponibles = [
    { id: '1', nombre: 'Matemáticas', horario: 'Lunes 8:00 - 10:00', cupos: 5 },
    { id: '2', nombre: 'Programación', horario: 'Martes 10:00 - 12:00', cupos: 3 },
    { id: '3', nombre: 'Bases de Datos', horario: 'Miércoles 14:00 - 16:00', cupos: 2 },
  ];

  const handleCheckboxChange = (materiaId: string) => {
    setSelectedMaterias(prev => 
      prev.includes(materiaId)
        ? prev.filter(id => id !== materiaId)
        : [...prev, materiaId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para guardar las materias seleccionadas
    console.log('Materias seleccionadas:', selectedMaterias);
    alert('Inscripción realizada con éxito');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inscripción de Materias</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {materiasDisponibles.map((materia) => (
              <div key={materia.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  id={`materia-${materia.id}`}
                  checked={selectedMaterias.includes(materia.id)}
                  onChange={() => handleCheckboxChange(materia.id)}
                  className="h-5 w-5 text-blue-600 rounded"
                />
                <label htmlFor={`materia-${materia.id}`} className="ml-3 flex-1">
                  <div className="font-medium text-gray-900">{materia.nombre}</div>
                  <div className="text-sm text-gray-500">
                    {materia.horario} • {materia.cupos} cupos disponibles
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              disabled={selectedMaterias.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Confirmar Inscripción
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InscripcionMaterias;