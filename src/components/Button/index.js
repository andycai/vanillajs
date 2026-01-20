import { el } from '../../utils/dom.js';

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  ...props
}) {
  return el('button', {
    class: `
      ${variants[variant]}
      ${sizes[size]}
      font-semibold rounded-lg
      focus:ring-2 focus:ring-offset-2
      transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed
      hover:shadow-md active:scale-95
    `,
    disabled,
    onClick,
    ...props
  }, [children]);
}
