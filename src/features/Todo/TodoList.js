import { el } from '../../utils/dom.js';
import { todoStore, todoActions } from './todo.store.js';
import { createSignal } from '../../app/store.js';

export function TodoList() {
  const { state } = todoStore;
  const [inputValue, setInputValue] = createSignal('');

  let todoListEl = null;
  let filterButtonsEl = null;
  let statsEl = null;

  const handleAddTodo = (e) => {
    e.preventDefault();
    const text = inputValue().trim();
    if (text) {
      todoActions.addTodo(text);
      setInputValue('');
      updateUI();
    }
  };

  const handleToggle = (id) => {
    todoActions.toggleTodo(id);
    updateUI();
  };

  const handleDelete = (id) => {
    todoActions.deleteTodo(id);
    updateUI();
  };

  const handleFilter = (filter) => {
    todoActions.setFilter(filter);
    updateUI();
  };

  const handleClearCompleted = () => {
    todoActions.clearCompleted();
    updateUI();
  };

  const getFilteredTodos = () => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter(t => !t.completed);
      case 'completed':
        return state.todos.filter(t => t.completed);
      default:
        return state.todos;
    }
  };

  const getStats = () => {
    const total = state.todos.length;
    const completed = state.todos.filter(t => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  const renderTodoItem = (todo) => {
    return el('li', { class: 'flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow' }, [
      el('input', {
        type: 'checkbox',
        checked: todo.completed,
        class: 'w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer',
        onChange: () => handleToggle(todo.id)
      }, []),
      el('span', {
        class: `flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'}`
      }, [todo.text]),
      el('button', {
        class: 'px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors',
        onClick: () => handleDelete(todo.id)
      }, ['Delete'])
    ]);
  };

  const renderFilterButtons = () => {
    const filters = ['all', 'active', 'completed'];
    return el('div', { class: 'flex gap-2' }, filters.map(filter =>
      el('button', {
        class: `px-4 py-2 rounded-lg font-medium transition-colors ${
          state.filter === filter
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`,
        onClick: () => handleFilter(filter)
      }, [filter.charAt(0).toUpperCase() + filter.slice(1)])
    ));
  };

  const renderStats = () => {
    const { total, active, completed } = getStats();
    return el('div', { class: 'text-sm text-gray-600' }, [
      `${active} items left · ${completed} completed · ${total} total`
    ]);
  };

  const updateUI = () => {
    if (!todoListEl) return;

    const todos = getFilteredTodos();
    todoListEl.replaceChildren(...todos.map(renderTodoItem));

    if (filterButtonsEl) {
      const newFilters = renderFilterButtons();
      filterButtonsEl.replaceWith(newFilters);
      filterButtonsEl = newFilters;
    }

    if (statsEl) {
      const newStats = renderStats();
      statsEl.replaceWith(newStats);
      statsEl = newStats;
    }
  };

  const container = el('div', { class: 'max-w-2xl mx-auto py-8 px-4' }, [
    el('h1', { class: 'text-4xl font-bold text-center mb-8 text-gray-900' }, ['Todo App']),

    el('form', { class: 'mb-8', onSubmit: handleAddTodo }, [
      el('div', { class: 'flex gap-3' }, [
        el('input', {
          type: 'text',
          class: 'flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none',
          placeholder: 'What needs to be done?',
          value: inputValue(),
          onInput: (e) => setInputValue(e.target.value)
        }, []),
        el('button', {
          type: 'submit',
          class: 'px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
        }, ['Add'])
      ])
    ]),

    (statsEl = renderStats()),

    (filterButtonsEl = renderFilterButtons()),

    el('div', { class: 'flex justify-between items-center mb-4' }, [
      el('span', { class: 'text-sm text-gray-500' }, ['Show:'])
    ]),

    (todoListEl = el('ul', { class: 'space-y-3' }, getFilteredTodos().map(renderTodoItem))),

    state.todos.some(t => t.completed) ? el('button', {
      class: 'mt-6 w-full px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors',
      onClick: handleClearCompleted
    }, ['Clear completed']) : null
  ]);

  return {
    el: container,
    cleanup: () => {}
  };
}
