import React, { useEffect, useRef, useState } from 'react';
import {
  PencilIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  CheckIcon,
  UserMinusIcon
} from '@heroicons/react/24/outline';
import { useAppStore } from '../../../store/UseAppStore';
import { CoursesAndSchedulesData, FormUpdateSubject } from '../../../types/Courses';
import { Tooltip } from 'react-tooltip';
import Warning from '../../../components/Warning/Warning';
import { getStoreUtils } from '../../../store/StoreUtils';
import api from '../../../lib/axios';
import { RequestUnassignTeacher } from '../../../types/Teacher';
/* import Warning from '../../../components/Warning/Warning';
 */


const ITEMS_PER_PAGE = 8;

interface ValidationErrors {
  [key: string]: string;
}


const ListTeacherCourses = () => {

  const { coursesAndSchedules, getCoursesAndSchedules, printAlert, postUnassignTeacher, deleteSubject, updateSubject } = useAppStore()
  const [currentPage, setCurrentPage] = useState(1);

  const hasFetched = useRef(false);

  const totalPages = Math.ceil(coursesAndSchedules.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = coursesAndSchedules.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Record<number, Partial<CoursesAndSchedulesData>>>({});


  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'Codigo':
        if (!value || value.trim() === '') return 'El código es requerido';
        if (value.length > 6) return 'El código no puede tener más de 6 caracteres';
        return '';

      case 'Materia':
        if (!value || value.trim() === '') return 'La materia es requerida';
        return '';
        
      default:
        return ''; // Default return for any other field names

      case 'Creditos':
        const creditos = Number(value);
        if (isNaN(creditos) || creditos <= 0) return 'Los créditos deben ser un número positivo';
        if (creditos > 10) return 'Máximo 10 créditos';
        return '';

      case 'Cupo_Maximo':
        const cupo = Number(value);
        if (isNaN(cupo) || cupo <= 0) return 'El cupo debe ser un número positivo';
        // Validar que el cupo no sea menor al cupo disponible actual
        const cursoActual = coursesAndSchedules.find(c => c.Id === editingId);
        if (cursoActual!.Cupo_Disponible < cursoActual!.Cupo_Maximo) {
          return 'No se pueder reducir el cupo porque hay estudiantes inscritos';
        }
        return '';

      case 'Horarios':
        // Si el campo está vacío, mostrar error
        if (!value || value.trim() === '') {
          return 'Los horarios son requeridos';
        }

        const diasValidos = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
        const diaIngresado = value.split(' ')[0].toLowerCase();

        if (!diasValidos.includes(diaIngresado)) {
          return 'Día inválido. Use: Lunes, Martes, Miércoles, Jueves o Viernes';
        }

        if (!value.includes(' a ') || !value.includes(':')) {
          return '';
        }

        try {
          const horarioRegex = /^(Lunes|Martes|Miércoles|Jueves|Viernes)\s+(?:de\s+)?(\d{1,2}):(\d{2})\s+a\s+(\d{1,2}):(\d{2})$/i;
          const match = value.match(horarioRegex);

          if (!match) {
            return 'Formato: "Lunes de 18:00 a 20:00"';
          }

          const [, dia, horaInicio, minutoInicio, horaFin, minutoFin] = match;
          const inicio = parseInt(horaInicio, 10) + parseInt(minutoInicio, 10) / 60;
          const fin = parseInt(horaFin, 10) + parseInt(minutoFin, 10) / 60;

          if (inicio < 18 || fin > 20 || inicio >= fin) {
            return 'Horario: 18:00 a 20:00';
          }
        } catch (e) {
          return 'Formato inválido';
        }
        return '';
    }
  };

  const [errors, setErrors] = useState<Record<number, ValidationErrors>>({});

  const handleInputChange = (id: number, field: string, value: string | number) => {
    const error = validateField(field, value);

    setErrors(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: error
      }
    }));

    if (!error) {
      setFormData(prev => {
        const currentData = coursesAndSchedules.find(c => c.Id === id);
        if (!currentData) return prev;
        const newData = {
          [id]: {
            ...currentData,
            ...prev[id],
            [field]: typeof value === 'number' ? Number(value) : value
          }
        };

        if (field === 'Cupo_Maximo' && currentData.Cupo_Disponible === currentData.Cupo_Maximo) {
          newData[id].Cupo_Disponible = Number(value);
        }

        return newData;
      });
    }
  };


  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    (async () => {

      try {
        const response = await getCoursesAndSchedules();
        if (!response.Success) {
          console.error('Error al cargar materias:', response.Message);
        }
      } catch (err) {
        console.error('Error inesperado:', err);
      }
    })();
  }, [getCoursesAndSchedules]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleEdit = (id: number) => {
    const course = coursesAndSchedules.find(c => c.Id === id);
    if (course!.Cupo_Disponible < course!.Cupo_Maximo) {
      printAlert(true, 'No se puede editar porque hay estudiantes inscritos');
      return;
    }
    setEditingId(id);
    if (course) {
      setFormData(prev => ({
        ...prev,
        [id]: { ...course }
      }));
    }
  };

  const handleDeleteSubject = (id: number) => {
    const course = coursesAndSchedules.find(c => c.Id === id);
    if (course!.Cupo_Disponible < course!.Cupo_Maximo) {
      printAlert(true, 'No se puede eliminar porque hay estudiantes inscritos');
      return;
    }
    if (course!.Profesor_Asignado !== null) {
      printAlert(true, 'No se puede eliminar porque tiene un profesor asignado');
      return;
    }

    deleteSubject(course!.Codigo);

  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleConfirm = async (id: number) => {
    const courseToSave = formData[id];
    if (!courseToSave) return;



    try {

      setEditingId(null);
      setFormData({});
      const formUpdateSubject: FormUpdateSubject = {
        MateriaId: Number(courseToSave.Id),
        Codigo: courseToSave.Codigo!,
        Nombre: courseToSave.Materia!,
        Descripcion: courseToSave.Descripcion!,
        Creditos: Number(courseToSave.Creditos),
        Cupo_Maximo: Number(courseToSave.Cupo_Maximo),
        Horarios: courseToSave.Horarios || ''
      }

      updateSubject(formUpdateSubject);

    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Ocurrió un error al guardar los cambios');
    }
  };

  const onDeleteTeacher = async (id: number) => {
    const course = coursesAndSchedules.find(c => c.Id === id);

    if (course!.Cupo_Disponible < course!.Cupo_Maximo) {
      printAlert(true, 'No se puede desasignar porque hay estudiantes inscritos');
      return;

    }
    const formRequesUnassignTeacher: RequestUnassignTeacher = {
      ProfesorId: course!.ProfesorId,
      CodigoMateria: course!.Codigo
    }

    postUnassignTeacher(formRequesUnassignTeacher);


  };



  return (
    <div className="p-6">
      <Warning message="Puede desasignar un profesor si no tiene estudiantes inscritos y puede eliminar una materia si no tiene profesor asignado" type="warning" />
      <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Materia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Créditos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cupo Maximo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cupo Disponible
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profesor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horarios
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((course) => (
                <tr key={course.Id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <input type="text" name="Codigo" className={editingId === course.Id ? 'border rounded p-1' : 'bg-transparent border-none'}
                      value={formData[course.Id]?.Codigo || course.Codigo} onChange={(e) => handleInputChange(course.Id, 'Codigo', e.target.value)} disabled={!editingId} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      <input type="text" name="Materia" className={editingId === course.Id ? 'border rounded p-1' : 'bg-transparent border-none'}
                        value={formData[course.Id]?.Materia || course.Materia} onChange={(e) => handleInputChange(course.Id, 'Materia', e.target.value)} disabled={!editingId} />
                      {errors[course.Id]?.Materia && (
                        <p className="text-red-500 text-xs mt-1">{errors[course.Id]?.Materia}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      <input type="text" name="Descripcion" className={editingId === course.Id ? 'border rounded p-1' : 'bg-transparent border-none'}
                        value={formData[course.Id]?.Descripcion || course.Descripcion} onChange={(e) => handleInputChange(course.Id, 'Descripcion', e.target.value)} disabled={!editingId} />
                      {errors[course.Id]?.Descripcion && (
                        <p className="text-red-500 text-xs mt-1">{errors[course.Id]?.Descripcion}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input type="number" name="Creditos" className={editingId === course.Id ? 'border rounded p-1' : 'bg-transparent border-none'}
                      value={formData[course.Id]?.Creditos || course.Creditos} onChange={(e) => handleInputChange(course.Id, 'Creditos', Number(e.target.value))} disabled={!editingId} />
                    {errors[course.Id]?.Creditos && (
                      <p className="text-red-500 text-xs mt-1">{errors[course.Id]?.Creditos}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="number"
                      name="Cupo_Maximo"
                      value={formData[course.Id]?.Cupo_Maximo || course.Cupo_Maximo}
                      onChange={(e) => handleInputChange(course.Id, 'Cupo_Maximo', Number(e.target.value))}
                      disabled={!editingId || course.Cupo_Disponible < course.Cupo_Maximo}
                      title={course.Cupo_Disponible < course.Cupo_Maximo ? 'No se puede modificar el cupo porque hay estudiantes inscritos' : ''}
                    />
                    {errors[course.Id]?.Cupo_Maximo && (
                      <p className="text-red-500 text-xs mt-1">{errors[course.Id]?.Cupo_Maximo}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formData[course.Id]?.Cupo_Disponible ?? course.Cupo_Disponible}

                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.Profesor_Asignado || 'Sin profesor asignado'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="relative">
                      <input
                        type="text"
                        name="Horarios"
                        value={formData[course.Id]?.Horarios || course.Horarios || ''}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            [course.Id]: {
                              ...prev[course.Id],
                              Horarios: e.target.value
                            }
                          }));
                        }}
                        onBlur={(e) => {
                          const error = validateField('Horarios', e.target.value);
                          setErrors(prev => ({
                            ...prev,
                            [course.Id]: {
                              ...prev[course.Id],
                              Horarios: error
                            }
                          }));
                        }}
                        disabled={editingId !== course.Id}
                        className={`
        w-full
        ${editingId === course.Id ? 'border rounded p-1' : 'bg-transparent border-none'}
        ${errors[course.Id]?.Horarios ? 'border-red-500' : ''}
      `}
                        placeholder="Ej: Lunes de 18:00 a 20:00"
                      />
                      {errors[course.Id]?.Horarios && (
                        <p className="text-red-500 text-xs mt-1 whitespace-nowrap">
                          {errors[course.Id].Horarios}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

                    {editingId === course.Id ? (
                      <button
                        data-tooltip-id="confirm-tooltip"
                        data-tooltip-content="Confirmar"
                        onClick={() => handleConfirm(course.Id)}
                        className="text-green-600 hover:text-green-900 mr-4"
                        title="Confirmar"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                    ) : (
                      <button
                        data-tooltip-id="edit-tooltip"
                        data-tooltip-content="Editar"
                        onClick={() => handleEdit(course.Id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        title="Editar"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    )}

                    <button
                      onClick={() => onDeleteTeacher(course.Id)}
                      data-tooltip-id="unassign-tooltip"
                      data-tooltip-content="Eliminar asignación de profesor"
                      className="text-yellow-600 hover:text-yellow-800 mr-2"
                      disabled={!course.Profesor_Asignado}
                    >
                      <UserMinusIcon className="h-5 w-5" />
                    </button>

                    {/* Botón para eliminar la materia */}
                    <Tooltip id="unassign-tooltip" />

                    <Tooltip id="confirm-tooltip" />
                    <Tooltip id="edit-tooltip" />
                    <Tooltip id="delete-tooltip" />
                    <button
                      data-tooltip-id="delete-tooltip"
                      data-tooltip-content="Eliminar materia"
                      onClick={() => handleDeleteSubject(course.Id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{startIndex + 1}</span> a{' '}
                  <span className="font-medium">
                    {Math.min(startIndex + ITEMS_PER_PAGE, coursesAndSchedules.length)}
                  </span>{' '}
                  de <span className="font-medium">{coursesAndSchedules.length}</span> resultados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Primera página</span>
                    <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Anterior</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>

                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Siguiente</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Última página</span>
                    <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListTeacherCourses;