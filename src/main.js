import './styles/main.css';
import { Router } from './app/router.js';

const routes = [
  {
    path: '/',
    component: () => import('./features/Home/HomePage.js').then(m => m.HomePage())
  },
  {
    path: '/todo',
    component: () => import('./features/Todo/TodoList.js').then(m => m.TodoList())
  }
];

const app = document.getElementById('app');
const router = new Router(routes, app);
router.resolve();
