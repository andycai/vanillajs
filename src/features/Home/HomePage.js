import { el } from '../../utils/dom.js';

export function HomePage() {
  return el('div', { class: 'max-w-4xl mx-auto py-16 px-4' }, [
    el('div', { class: 'text-center mb-12' }, [
      el('h1', { class: 'text-5xl font-bold mb-4 text-gray-900' }, [
        'Vanilla JS Architecture'
      ]),
      el('p', { class: 'text-xl text-gray-600 mb-8' }, [
        'Modern JavaScript without frameworks - pure performance and control'
      ]),
      el('div', { class: 'flex justify-center gap-4' }, [
        el('a', {
          href: '/todo',
          'data-link': 'true',
          class: 'px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl'
        }, ['Try Todo App']),
        el('a', {
          href: 'https://github.com',
          target: '_blank',
          class: 'px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl'
        }, ['View on GitHub'])
      ])
    ]),

    el('div', { class: 'grid md:grid-cols-3 gap-8 mb-12' }, [
      el('div', { class: 'bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow' }, [
        el('div', { class: 'w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4' }, [
          el('span', { class: 'text-2xl' }, ['⚡'])
        ]),
        el('h3', { class: 'text-xl font-bold mb-2 text-gray-900' }, ['Zero Runtime Dependencies']),
        el('p', { class: 'text-gray-600' }, [
          'No framework overhead. Pure ES6+ with native browser APIs for maximum performance.'
        ])
      ]),
      el('div', { class: 'bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow' }, [
        el('div', { class: 'w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4' }, [
          el('span', { class: 'text-2xl' }, ['🎨'])
        ]),
        el('h3', { class: 'text-xl font-bold mb-2 text-gray-900' }, ['Functional Components']),
        el('p', { class: 'text-gray-600' }, [
          'React-like development experience with pure functions and signals, no Virtual DOM needed.'
        ])
      ]),
      el('div', { class: 'bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow' }, [
        el('div', { class: 'w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4' }, [
          el('span', { class: 'text-2xl' }, ['🔧'])
        ]),
        el('h3', { class: 'text-xl font-bold mb-2 text-gray-900' }, ['Modern Tooling']),
        el('p', { class: 'text-gray-600' }, [
          'Powered by Vite for instant HMR, Tailwind CSS for rapid UI development, and Vitest for testing.'
        ])
      ])
    ]),

    el('div', { class: 'bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white shadow-xl' }, [
      el('h2', { class: 'text-3xl font-bold mb-4' }, ['Architecture Highlights']),
      el('ul', { class: 'space-y-3' }, [
        el('li', { class: 'flex items-start gap-3' }, [
          el('span', { class: 'text-green-300' }, ['✓']),
          el('span', {}, ['Proxy-based state management with fine-grained reactivity'])
        ]),
        el('li', { class: 'flex items-start gap-3' }, [
          el('span', { class: 'text-green-300' }, ['✓']),
          el('span', {}, ['Custom History API router with lazy loading support'])
        ]),
        el('li', { class: 'flex items-start gap-3' }, [
          el('span', { class: 'text-green-300' }, ['✓']),
          el('span', {}, ['Pub/Sub event bus for decoupled component communication'])
        ]),
        el('li', { class: 'flex items-start gap-3' }, [
          el('span', { class: 'text-green-300' }, ['✓']),
          el('span', {}, ['Feature-first architecture with component colocation'])
        ])
      ])
    ])
  ]);
}
