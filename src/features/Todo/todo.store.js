import { createStore } from '../../app/store.js';
import { todoService } from './todo.service.js';

export const todoStore = createStore({
  todos: [],
  filter: 'all',
  loading: false,
  error: null
});

const { state, subscribe } = todoStore;

subscribe(() => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }
});

export const todoActions = {
  async loadTodos() {
    state.loading = true;
    state.error = null;

    try {
      const todos = await todoService.fetchTodos();
      state.todos = todos;
    } catch (error) {
      state.error = error.message;
    } finally {
      state.loading = false;
    }
  },

  addTodo(text) {
    const newTodo = todoService.createTodo(text);
    state.todos = [...state.todos, newTodo];
  },

  toggleTodo(id) {
    state.todos = state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  },

  deleteTodo(id) {
    state.todos = state.todos.filter(todo => todo.id !== id);
  },

  setFilter(filter) {
    state.filter = filter;
  },

  clearCompleted() {
    state.todos = state.todos.filter(todo => !todo.completed);
  }
};

if (typeof window !== 'undefined') {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    state.todos = JSON.parse(savedTodos);
  }
}
