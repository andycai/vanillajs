/**
 * Global state management using Proxy
 * @param {Object} initialState - Initial state object
 * @returns {Object} Store object with state and subscribe method
 */
let _createStoreImpl = (initialState) => {
  const listeners = new Set();

  const state = new Proxy(initialState, {
    set(target, prop, value) {
      const oldValue = target[prop];
      target[prop] = value;
      listeners.forEach(fn => fn(state, prop, value, oldValue));
      return true;
    }
  });

  const subscribe = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };

  return { state, subscribe };
};

export const createStore = _createStoreImpl;

/**
 * Signal-based local state management (closure-based)
 * Similar to SolidJS signals - provides fine-grained reactivity
 * @param {*} initialValue - Initial signal value
 * @returns {Array} [getter, setter, effect] tuple
 */
export const createSignal = (initialValue) => {
  let value = initialValue;
  const subscribers = new Set();

  const read = () => value;
  const write = (newValue) => {
    if (value !== newValue) {
      value = newValue;
      subscribers.forEach(fn => fn(value));
    }
  };

  const effect = (fn) => {
    subscribers.add(fn);
    fn(value);
    return () => subscribers.delete(fn);
  };

  return [read, write, effect];
};

/**
 * Derived state / Computed signal
 * Automatically updates when dependencies change
 * @param {Function} getter - Function that computes derived value
 * @param {Array} signals - Array of [getter, setter] tuples to track
 * @returns {Function} Getter for derived value
 */
export const createComputed = (getter, signals) => {
  const [read, write, effect] = createSignal(getter());

  signals.forEach(([getter]) => {
    effect(() => write(getter()));
  });

  return read;
};

/**
 * Create a batch update mechanism
 * Reduces re-renders by batching multiple state updates
 * @param {Function} fn - Function that performs multiple updates
 */
export const batch = (fn) => {
  const originalImpl = _createStoreImpl;
  let pendingUpdates = [];

  // Temporarily override implementation to batch updates
  _createStoreImpl = (initialState) => {
    const { state: s, subscribe } = originalImpl(initialState);
    return {
      state: s,
      subscribe: (fn) => {
        const wrappedFn = (state, prop, value, oldValue) => {
          pendingUpdates.push({ fn, state, prop, value, oldValue });
        };
        return subscribe(wrappedFn);
      }
    };
  };

  fn();

  // Flush all pending updates
  pendingUpdates.forEach(update => update.fn(update.state, update.prop, update.value, update.oldValue));
  pendingUpdates = [];

  // Restore original implementation
  _createStoreImpl = originalImpl;
};
