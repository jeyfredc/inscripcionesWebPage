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
import { Tooltip } from 'react-tooltip';
import Warning from '../../../components/Warning/Warning';
import { useListTeacherCourses } from '../../../hooks/useListTeacherCourses';
import { useEffect } from 'react';
import ButtonAction from '../../../components/courses/ButtonAction/ButtonAction';
import NavPagination from '../../../components/courses/Pagination/NavPagination';



const ITEMS_PER_PAGE = 8;



const ListTeacherCourses = () => {

  const { coursesAndSchedules } = useAppStore();
  
  const {
    currentPage,
    editingId,
    formData,
    errors,
    startIndex,
    totalPages,
    paginatedData,
    goToPage,
    handleInputChange,
    handleEdit,
    handleDeleteSubject,
    handleSave,
    handleUnassignTeacher,
    getPageNumbers
  } = useListTeacherCourses();


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
                        onChange={(e) => handleInputChange(course.Id, 'Horarios', e.target.value)}
                        onBlur={(e) => handleInputChange(course.Id, 'Horarios', e.target.value)}
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
                      <ButtonAction
                        variant="confirm"
                        onClick={() => handleSave(course.Id)}
                      />
                    ) : (
                      <ButtonAction
                        variant="edit"
                        onClick={() => handleEdit(course.Id)}
                      />
                    )}

                    <ButtonAction
                      variant="unassign"
                      onClick={() => handleUnassignTeacher(course.Id)}
                      disabled={!course.Profesor_Asignado}
                    />

                    <ButtonAction
                      variant="delete"
                      onClick={() => handleDeleteSubject(course.Id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <NavPagination
            startIndex={startIndex}
            itemsPerPage={ITEMS_PER_PAGE}
            coursesAndSchedules={coursesAndSchedules}
            goToPage={goToPage}
            currentPage={currentPage}
            totalPages={totalPages}
            getPageNumbers={getPageNumbers}
          />
        )}
      </div>
    </div>
  );
};

export default ListTeacherCourses;