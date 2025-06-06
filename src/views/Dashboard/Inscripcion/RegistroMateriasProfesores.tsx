import React, { useState } from 'react';
import { FormRegisterNewCourse } from '../../../types/Courses';
import { useAppStore } from '../../../store/UseAppStore';

const initialState: FormRegisterNewCourse = {
  Nombre: '',
  Descripcion: '',
  Creditos: 0,
  Cupo_Maximo: 0,
  Activa: true,
  Codigo: '',
};

const RegistroMateriasProfesores = () => {

  const { saveNewCourse } = useAppStore();
  const [formData, setFormData] = useState<FormRegisterNewCourse>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveNewCourse(formData);
    setFormData(initialState);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Registro de Nueva Materia</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="Codigo" className="block text-sm font-medium text-gray-700">
              Código de la Materia
            </label>
            <input 
              type="text" 
              id="Codigo" 
              name="Codigo" 
              value={formData.Codigo} 
              onChange={handleChange} 
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="Nombre" className="block text-sm font-medium text-gray-700">
              Nombre de la Materia
            </label>
            <input
              type="text"
              id="Nombre"
              name="Nombre"
              value={formData.Nombre}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="Descripcion" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="Descripcion"
              name="Descripcion"
              rows={3}
              value={formData.Descripcion}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="Creditos" className="block text-sm font-medium text-gray-700">
              Créditos
            </label>
            <input
              type="number"
              id="Creditos"
              name="Creditos"
              min="1"
              value={formData.Creditos}
              onChange={handleChange}
              className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center"
            />
          </div>

          <div>
            <label htmlFor="Cupo_Maximo" className="block text-sm font-medium text-gray-700">
              Cupos Disponibles
            </label>
            <input
              type="number"
              id="Cupo_Maximo"
              name="Cupo_Maximo"
              min="1"
              value={formData.Cupo_Maximo}
              onChange={handleChange}
              className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center"
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
export default RegistroMateriasProfesores;