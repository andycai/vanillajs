export const todoService = {
  async fetchTodos() {
    return Promise.resolve([
      { id: 1, text: 'Learn vanilla JS architecture', completed: false },
      { id: 2, text: 'Build a todo app', completed: false },
      { id: 3, text: 'Master functional components', completed: true }
    ]);
  },

  createTodo(text) {
    return {
      id: Date.now(),
      text,
      completed: false
    };
  },

  async saveTodo(todo) {
    return Promise.resolve(todo);
  },

  async deleteTodo(id) {
    return Promise.resolve(id);
  }
};
