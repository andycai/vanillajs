import { EventBus, Events } from './events.js';

export class Router {
  constructor(routes, rootElement) {
    this.routes = routes;
    this.root = rootElement;
    this.currentCleanup = null;

    window.addEventListener('popstate', () => this.resolve());
    document.addEventListener('click', this.handleLinkClick.bind(this));
  }

  handleLinkClick(e) {
    const link = e.target.closest('[data-link]');
    if (link) {
      e.preventDefault();
      this.navigate(link.getAttribute('href'));
    }
  }

  navigate(path) {
    window.history.pushState(null, null, path);
    this.resolve();
  }

  async resolve() {
    const path = window.location.pathname;
    const route = this.routes.find(r => r.path === path) || this.routes.find(r => r.path === '*');

    if (!route) return;

    if (this.currentCleanup) this.currentCleanup();
    this.root.innerHTML = '';

    const component = await route.component();

    if (component instanceof Node) {
      this.root.appendChild(component);
    } else if (typeof component === 'object' && component.el) {
      this.root.appendChild(component.el);
      this.currentCleanup = component.cleanup;
    }

    EventBus.emit(Events.ROUTER_CHANGE, { path, route });
  }
}
