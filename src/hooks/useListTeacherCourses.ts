import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '../store/UseAppStore';
import { CoursesAndSchedulesData, FormUpdateSubject } from '../types/Courses';
import { RequestUnassignTeacher } from '../types/Teacher';

const ITEMS_PER_PAGE = 8;

interface ValidationErrors {
  [key: string]: string;
}

export const useListTeacherCourses = () => {
  const {
    coursesAndSchedules,
    getCoursesAndSchedules,
    printAlert,
    postUnassignTeacher,
    deleteSubject,
    updateSubject
  } = useAppStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Record<number, Partial<CoursesAndSchedulesData>>>({});
  const [errors, setErrors] = useState<Record<number, ValidationErrors>>({});
  const hasFetched = useRef(false);

  const totalPages = Math.ceil(coursesAndSchedules.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = coursesAndSchedules.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    
    const loadCourses = async () => {
      try {
        const response = await getCoursesAndSchedules();
        if (!response.Success) {
          console.error('Error al cargar materias:', response.Message);
        }
      } catch (err) {
        console.error('Error inesperado:', err);
      }
    };

    loadCourses();
  }, [getCoursesAndSchedules]);

  const validateField = useCallback((name: string, value: string | number): string => {
    const strValue = String(value);
    
    switch (name) {
      case 'Codigo':
        if (!strValue || strValue.trim() === '') return 'El código es requerido';
        if (strValue.length > 6) return 'El código no puede tener más de 6 caracteres';
        return '';

      case 'Materia':
        if (!strValue || strValue.trim() === '') return 'La materia es requerida';
        return '';
        
      case 'Creditos': {
        const creditos = Number(value);
        if (isNaN(creditos) || creditos <= 0) return 'Los créditos deben ser un número positivo';
        if (creditos > 10) return 'Máximo 10 créditos';
        return '';
      }

      case 'Cupo_Maximo': {
        const cupo = Number(value);
        if (isNaN(cupo) || cupo <= 0) return 'El cupo debe ser un número positivo';
        const cursoActual = coursesAndSchedules.find(c => c.Id === editingId);
        if (cursoActual && cursoActual.Cupo_Disponible < cursoActual.Cupo_Maximo) {
          return 'No se puede reducir el cupo porque hay estudiantes inscritos';
        }
        return '';
      }

      case 'Horarios':
        if (!strValue || strValue.trim() === '') {
          return 'Los horarios son requeridos';
        }

        const diasValidos = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
        const diaIngresado = strValue.split(' ')[0].toLowerCase();

        if (!diasValidos.includes(diaIngresado)) {
          return 'Día inválido. Use: Lunes, Martes, Miércoles, Jueves o Viernes';
        }

        if (!strValue.includes(' a ') || !strValue.includes(':')) {
          return 'Formato inválido. Use: "Lunes de 18:00 a 20:00"';
        }

        try {
          const horarioRegex = /^(Lunes|Martes|Miércoles|Jueves|Viernes)\s+(?:de\s+)?(\d{1,2}):(\d{2})\s+a\s+(\d{1,2}):(\d{2})$/i;
          const match = strValue.match(horarioRegex);

          if (!match) {
            return 'Formato: "Lunes de 18:00 a 20:00"';
          }

          const [, , horaInicio, minutoInicio, horaFin, minutoFin] = match;
          const inicio = parseInt(horaInicio, 10) + parseInt(minutoInicio, 10) / 60;
          const fin = parseInt(horaFin, 10) + parseInt(minutoFin, 10) / 60;

          if (inicio < 18 || fin > 20 || inicio >= fin) {
            return 'Horario permitido: 18:00 a 20:00';
          }
        } catch (e) {
          return 'Formato inválido';
        }
        return '';

      default:
        return ''; 
    }
  }, [editingId, coursesAndSchedules]);

  const handleInputChange = useCallback((id: number, field: string, value: string | number) => {
    if (editingId === null) return;
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
          ...prev,
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
  }, [coursesAndSchedules, validateField]);

  const handleEdit = useCallback((id: number) => {
    const course = coursesAndSchedules.find(c => c.Id === id);
    if (!course) return;

    if (course.Cupo_Disponible < course.Cupo_Maximo) {
      printAlert(true, 'No se puede editar porque hay estudiantes inscritos');
      return;
    }
    
    setEditingId(id);
    setFormData(prev => ({
      ...prev,
      [id]: { ...course }
    }));
  }, [coursesAndSchedules, printAlert]);

  const handleDeleteSubject = useCallback((id: number) => {
    const course = coursesAndSchedules.find(c => c.Id === id);
    if (!course) return;
    
    if (course.Cupo_Disponible < course.Cupo_Maximo) {
      printAlert(true, 'No se puede eliminar porque hay estudiantes inscritos');
      return;
    }
    if (course.Profesor_Asignado !== null) {
      printAlert(true, 'No se puede eliminar porque tiene un profesor asignado');
      return;
    }

    deleteSubject(course.Codigo);
  }, [coursesAndSchedules, deleteSubject, printAlert]);

  const handleSave = useCallback(async (id: number) => {
    const courseToSave = formData[id];
    if (!courseToSave) return;



    try {
      setEditingId(null);
      const formUpdateSubject: FormUpdateSubject = {
        MateriaId: Number(courseToSave.Id),
        Codigo: courseToSave.Codigo!,
        Nombre: courseToSave.Materia!,
        Descripcion: courseToSave.Descripcion || '',
        Creditos: Number(courseToSave.Creditos) || 1,
        Cupo_Maximo: Number(courseToSave.Cupo_Maximo) || 1,
        Horarios: courseToSave.Horarios || ''
      };

      const response = await updateSubject(formUpdateSubject);
      if (!response.Success) {
        printAlert(true, response.Message || 'Error al actualizar la materia');
        return;
      }

      printAlert(false, 'Materia actualizada correctamente');
      setFormData({});
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      printAlert(true, 'Ocurrió un error al guardar los cambios');
    }
  }, [formData, updateSubject, printAlert]);

  const handleUnassignTeacher = useCallback(async (id: number) => {
    const course = coursesAndSchedules.find(c => c.Id === id);
    if (!course) return;

    if (course.Cupo_Disponible < course.Cupo_Maximo) {
      printAlert(true, 'No se puede desasignar porque hay estudiantes inscritos');
      return;
    }

    if (!course.ProfesorId || !course.Codigo) {
      printAlert(true, 'No se puede desasignar: información del profesor o código de materia inválida');
      return;
    }

    try {
      const response = await postUnassignTeacher({
        ProfesorId: course.ProfesorId,
        CodigoMateria: course.Codigo
      });

      if (!response.Success) {
        printAlert(true, response.Message || 'Error al desasignar el profesor');
        return;
      }

      printAlert(false, 'Profesor desasignado correctamente');
    } catch (error) {
      console.error('Error al desasignar profesor:', error);
      printAlert(true, 'Ocurrió un error al desasignar el profesor');
    }
  }, [coursesAndSchedules, postUnassignTeacher, printAlert]);

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

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  return {
    currentPage,
    editingId,
    formData,
    errors,
    startIndex,
    totalPages,
    paginatedData,
    goToPage,
    validateField,
    handleInputChange,
    handleEdit,
    handleDeleteSubject,
    handleSave,
    handleUnassignTeacher,
    getPageNumbers
  };
};