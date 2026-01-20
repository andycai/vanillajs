# Vanilla JS Architecture

A modern, production-ready vanilla JavaScript SPA architecture demonstrating that you don't need frameworks to build sophisticated applications.

## Features

- **Zero Runtime Dependencies**: Pure ES6+ with native browser APIs
- **Proxy-based State Management**: Fine-grained reactivity similar to React Hooks/SolidJS
- **Custom History API Router**: Lazy loading, cleanup support
- **Pub/Sub Event Bus**: Decoupled component communication
- **Functional Components**: No Virtual DOM, direct DOM manipulation
- **Modern Tooling**: Vite, Tailwind CSS, Vitest

## Architecture

```
src/
├── app/              # Core infrastructure
│   ├── router.js     # History API router with lazy loading
│   ├── store.js      # Proxy-based store + Signals
│   └── events.js     # Pub/Sub event bus
├── components/       # Reusable UI components
│   ├── Button/
│   └── Modal/
├── features/         # Feature modules
│   ├── Home/
│   └── Todo/
├── utils/           # Utility functions
│   └── dom.js       # DOM helper functions
└── main.js          # Application entry point
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Example: Todo App

The `/todo` route demonstrates a complete feature implementation with:
- State management using Proxy store
- Signals for local component state
- Filtering (all/active/completed)
- CRUD operations
- LocalStorage persistence

## Core Patterns

### Functional Components

```javascript
import { el } from '../utils/dom.js';

export function Counter() {
  const [count, setCount] = createSignal(0);
  const span = el('span', {}, [`Count: ${count()}`]);

  return el('button', {
    onClick: () => {
      setCount(count() + 1);
      span.textContent = `Count: ${count()}`;
    }
  }, [span]);
}
```

### Global State (Proxy)

```javascript
import { createStore } from './store.js';

const { state, subscribe } = createStore({ count: 0 });

subscribe((state, prop, newValue, oldValue) => {
  console.log(`Changed ${prop} from ${oldValue} to ${newValue}`);
});

state.count = 1; // Triggers subscribers
```

### Local State (Signals)

```javascript
import { createSignal } from './store.js';

const [count, setCount, effect] = createSignal(0);

effect((value) => {
  console.log('Count changed to:', value);
});

setCount(1); // Logs: Count changed to: 1
```

### Event Bus

```javascript
import { EventBus } from './events.js';

EventBus.on('custom:event', (data) => {
  console.log('Received:', data);
});

EventBus.emit('custom:event', { message: 'Hello!' });
```

## Browser Support

Modern browsers supporting:
- ES Modules
- ES6 Proxy
- History API
- Tailwind CSS (CSS Variables)

## License

MIT
