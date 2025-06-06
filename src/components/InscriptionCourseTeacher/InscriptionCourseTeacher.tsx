import React, { useState, useCallback } from 'react'

interface InscriptionCourseTeacherProps {
  onSelectionChange: (data: {
    dia: string;
    horario: string;
    grupo: string;
  }) => void;
  initialValues?: {
    dia?: string;
    horario?: string;   
    grupo?: string;
  };
}

const InscriptionCourseTeacher: React.FC<InscriptionCourseTeacherProps> = ({ 
    onSelectionChange, 
    initialValues 
  }) => {
    const [selectedDay, setSelectedDay] = useState(initialValues?.dia || 'Lunes');
    const [selectedTime, setSelectedTime] = useState(initialValues?.horario || '6:00 PM - 8:00 PM');
    const [selectedGroup, setSelectedGroup] = useState(initialValues?.grupo || 'A');
  
    const handleChange = useCallback((type: 'dia' | 'horario' | 'grupo', value: string) => {
      switch (type) {
        case 'dia':
          setSelectedDay(value);
          break;
        case 'horario':
          setSelectedTime(value);
          break;
        case 'grupo':
          setSelectedGroup(value);
          break;
      }
      onSelectionChange({
        dia: type === 'dia' ? value : selectedDay,
        horario: type === 'horario' ? value : selectedTime,
        grupo: type === 'grupo' ? value : selectedGroup
      });
    }, [selectedDay, selectedTime, selectedGroup, onSelectionChange]);

    const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => 
        handleChange('dia', e.target.value);
      
      const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => 
        handleChange('horario', e.target.value);
      
      const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => 
        handleChange('grupo', e.target.value);

    const daysOfWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const timeSlots = ['6:00 PM - 8:00 PM', '8:00 PM - 10:00 PM'];
    const groups = ['A', 'B', 'C'];

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label htmlFor="dia" className="block text-sm font-medium text-gray-700">
          Día de la semana
        </label>
        <select
          id="dia"
          value={selectedDay}
          onChange={handleDayChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="horario" className="block text-sm font-medium text-gray-700">
          Horario
        </label>
        <select
          id="horario"
          value={selectedTime}
          onChange={handleTimeChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          {timeSlots.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="grupo" className="block text-sm font-medium text-gray-700">
          Grupo
        </label>
        <select
          id="grupo"
          value={selectedGroup}
          onChange={handleGroupChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          {groups.map((group) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InscriptionCourseTeacher;