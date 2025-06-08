import { useState, useCallback, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { ApiResponse } from '../types/api';
import { toast } from 'react-toastify';
import { RequestUnassignTeacher } from '../types/Teacher';
import { deleteSubjectByCodeId, GetCoursesAndSchedules, updateSubjectByCodeId } from '../api/CourseApi';
import { PostUnassignTeacher } from '../api/ProfesorApi';
import { CoursesAndSchedulesData, FormUpdateSubject } from '../types/Courses';

const ITEMS_PER_PAGE = 8;

interface ValidationErrors {
  [key: string]: string;
}

export const useListTeacherCourses = () => {

  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Record<number, Partial<CoursesAndSchedulesData>>>({});
  const [errors, setErrors] = useState<Record<number, ValidationErrors>>({});
  const [coursesAndSchedules, setCoursesAndSchedules] = useState<CoursesAndSchedulesData[]>([]);

  const updateSubjectMutation = useMutation({
    mutationFn: (data: FormUpdateSubject) => updateSubjectByCodeId(data),
    onSuccess: (response: ApiResponse<CoursesAndSchedulesData>) => {
      if (response.Success) {
        queryClient.invalidateQueries({ queryKey: ['teacherCoursesList'] });
        toast.success(response.Message);
        setEditingId(null);
        setFormData({});
      } else {
        throw new Error(response.Message || 'Error al actualizar la materia');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const unassignTeacherMutation = useMutation({
    mutationFn: (data: RequestUnassignTeacher) => PostUnassignTeacher(data),
    onSuccess: (response: ApiResponse<any>) => {
      if (response.Success) {
        queryClient.invalidateQueries({ queryKey: ['teacherCoursesList'] });
        toast.success(response.Message);
      } else {
        throw new Error(response.Message || 'Error al desasignar el profesor');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const deleteSubjectMutation = useMutation({
    mutationFn: (subjectCode: string) => deleteSubjectByCodeId(subjectCode),
    onSuccess: (response: ApiResponse<any>, subjectCode: string) => {
      if (response.Success) {
        queryClient.invalidateQueries({ queryKey: ['teacherCoursesList'] });
        toast.success(response.Message);
      } else {
        throw new Error(response.Message || `Error al eliminar la materia ${subjectCode}`);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const totalPages = Math.ceil((coursesAndSchedules?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = coursesAndSchedules?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];


  const { data, isLoading, error } = useQuery({
    queryKey: ['teacherCoursesList'],
    queryFn: GetCoursesAndSchedules,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true
  });

  useEffect(() => {
    if (data) {
      if (data.Success && data.Data) {
        setCoursesAndSchedules(data.Data);
      } else {
        toast.error(data.Message || 'Error al cargar las materias');
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

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
      toast.error('No se puede editar porque hay estudiantes inscritos');
      return;
    }
    
    setEditingId(id);
    setFormData(prev => ({
      ...prev,
      [id]: { ...course }
    }));
  }, [coursesAndSchedules]);

  const handleDeleteSubject = useCallback((id: number) => {
    const course = coursesAndSchedules.find(c => c.Id === id);
    if (!course) return;
    
    if (course.Cupo_Disponible < course.Cupo_Maximo) {
      toast.error('No se puede eliminar porque hay estudiantes inscritos');
      return;
    }
    if (course.Profesor_Asignado !== null) {
      toast.error('No se puede eliminar porque tiene un profesor asignado');
      return;
    }

    deleteSubjectMutation.mutate(course.Codigo);
  }, [coursesAndSchedules, deleteSubjectMutation]);

  const handleSave = useCallback((id: number) => {
    const courseToSave = formData[id];
    if (!courseToSave) return;

    const formUpdateSubject: FormUpdateSubject = {
      MateriaId: Number(courseToSave.Id),
      Codigo: courseToSave.Codigo!,
      Nombre: courseToSave.Materia!,
      Descripcion: courseToSave.Descripcion || '',
      Creditos: Number(courseToSave.Creditos) || 1,
      Cupo_Maximo: Number(courseToSave.Cupo_Maximo) || 1,
      Horarios: courseToSave.Horarios || ''
    };

    updateSubjectMutation.mutate(formUpdateSubject);
  }, [formData, updateSubjectMutation]);

  const handleUnassignTeacher = useCallback((id: number) => {
    const course = coursesAndSchedules.find(c => c.Id === id);
    if (!course) return;

    if (course.Cupo_Disponible < course.Cupo_Maximo) {
      toast.error('No se puede desasignar porque hay estudiantes inscritos');
      return;
    }

    if (!course.ProfesorId || !course.Codigo) {
      toast.error('No se puede desasignar: información del profesor o código de materia inválida');
      return;
    }

    unassignTeacherMutation.mutate({
      ProfesorId: course.ProfesorId,
      CodigoMateria: course.Codigo
    });
  }, [coursesAndSchedules, unassignTeacherMutation]);

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
    isLoading,
    error,
    goToPage,
    validateField,
    handleInputChange,
    handleEdit,
    handleDeleteSubject,
    handleSave,
    handleUnassignTeacher,
    getPageNumbers,
    courses: coursesAndSchedules || [],
    coursesAndSchedules
  };
};