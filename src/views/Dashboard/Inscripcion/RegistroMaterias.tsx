// src/views/Dashboard/Inscripcion/RegistroMaterias.tsx
import React, { useState } from 'react';

const RegistroMaterias = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    horario: '',
    cupos: '',
    descripcion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para guardar la materia
    console.log('Materia registrada:', formData);
    alert('Materia registrada con éxito');
    setFormData({ nombre: '', horario: '', cupos: '', descripcion: '' });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Registro de Nueva Materia</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre de la Materia
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="horario" className="block text-sm font-medium text-gray-700">
              Horario
            </label>
            <input
              type="text"
              id="horario"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              placeholder="Ej: Lunes y Miércoles 14:00 - 16:00"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="cupos" className="block text-sm font-medium text-gray-700">
              Cupos Disponibles
            </label>
            <input
              type="number"
              id="cupos"
              name="cupos"
              min="1"
              value={formData.cupos}
              onChange={handleChange}
              required
              className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows={3}
              value={formData.descripcion}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Registrar Materia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroMaterias;