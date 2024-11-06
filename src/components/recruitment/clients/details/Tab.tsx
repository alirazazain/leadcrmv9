interface TabProps {
  id: string;
  label: string;
  count?: number;
  isActive: boolean;
  onClick: () => void;
}

export function Tab({ id, label, count, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative py-4 px-1 text-sm font-medium transition-colors duration-200
        ${isActive
          ? 'text-indigo-600 border-b-2 border-indigo-600'
          : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
        }
      `}
    >
      {label}
      {count !== undefined && (
        <span className={`
          ml-2 px-2 py-0.5 text-xs font-medium rounded-full
          ${isActive
            ? 'bg-indigo-100 text-indigo-600'
            : 'bg-gray-100 text-gray-900'
          }
        `}>
          {count}
        </span>
      )}
    </button>
  );
}