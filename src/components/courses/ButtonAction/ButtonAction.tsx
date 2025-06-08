import React from 'react';
import { 
  PencilIcon, 
  TrashIcon, 
  CheckIcon, 
  UserMinusIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';

type ButtonVariant = 'edit' | 'delete' | 'confirm' | 'unassign' | 'cancel';

interface ButtonActionProps {
  variant: ButtonVariant;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const iconMap = {
  edit: PencilIcon,
  delete: TrashIcon,
  confirm: CheckIcon,
  unassign: UserMinusIcon,
  cancel: XMarkIcon
};

const variantStyles = {
  edit: 'text-indigo-600 hover:text-indigo-900',
  delete: 'text-red-600 hover:text-red-900',
  confirm: 'text-green-600 hover:text-green-900',
  unassign: 'text-yellow-600 hover:text-yellow-800',
  cancel: 'text-gray-600 hover:text-gray-900'
};

const tooltipText = {
  edit: 'Editar',
  delete: 'Eliminar materia',
  confirm: 'Confirmar',
  unassign: 'Eliminar asignación de profesor',
  cancel: 'Cancelar'
};

const ButtonAction: React.FC<ButtonActionProps> = ({ 
  variant, 
  onClick, 
  disabled = false,
  className = ''
}) => {
  const Icon = iconMap[variant];
  const tooltipId = `${variant}-tooltip`;

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipText[variant]}
        disabled={disabled}
        className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          variantStyles[variant]
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      >
        <Icon className="h-5 w-5" />
      </button>
      <Tooltip id={tooltipId} />
    </>
  );
};

export default ButtonAction;