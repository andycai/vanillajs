/**
 * Simple PubSub event bus for decoupled component communication
 */
export const EventBus = {
  events: {},

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = new Set();
    }
    this.events[event].add(callback);
    return () => this.events[event].delete(callback);
  },

  once(event, callback) {
    const wrapper = (data) => {
      callback(data);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  },

  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event].delete(callback);
    if (this.events[event].size === 0) {
      delete this.events[event];
    }
  },

  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(cb => cb(data));
  },

  clear() {
    this.events = {};
  },

  listenerCount(event) {
    return this.events[event]?.size || 0;
  }
};

/**
 * Common event names
 */
export const Events = {
  TOAST_SHOW: 'toast:show',
  TOAST_HIDE: 'toast:hide',
  MODAL_OPEN: 'modal:open',
  MODAL_CLOSE: 'modal:close',
  ROUTER_CHANGE: 'router:change',
  STATE_UPDATE: 'state:update'
};
