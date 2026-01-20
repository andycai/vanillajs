import { el } from '../../utils/dom.js';

export function Modal({ title, isOpen, onClose, children, size = 'md' }) {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  document.addEventListener('keydown', handleEscape);

  const modal = el('div', {
    class: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4',
    onClick: handleBackdropClick
  }, [
    el('div', {
      class: `bg-white rounded-xl shadow-2xl w-full ${sizes[size]} transform transition-all`
    }, [
      el('div', { class: 'flex items-center justify-between p-6 border-b' }, [
        el('h2', { class: 'text-2xl font-bold text-gray-900' }, [title]),
        el('button', {
          class: 'text-gray-400 hover:text-gray-600 text-2xl font-semibold leading-none',
          onClick: onClose
        }, ['×'])
      ]),
      el('div', { class: 'p-6' }, [children])
    ])
  ]);

  const cleanup = () => {
    document.removeEventListener('keydown', handleEscape);
  };

  return {
    el: modal,
    cleanup
  };
}
