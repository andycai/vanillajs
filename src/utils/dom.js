/**
 * DOM helper functions for creating elements
 * @param {string} tag - HTML tag name
 * @param {Object} attrs - HTML attributes and event listeners
 * @param {Array} children - Child nodes (strings or DOM nodes)
 * @returns {HTMLElement} Created element
 */
export const el = (tag, attrs = {}, children = []) => {
  const element = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      // Event listener: onClick -> click
      const eventName = key.substring(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else if (key === 'class') {
      element.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(element.style, value);
    } else if (key === 'dataset' && typeof value === 'object') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else {
      element.setAttribute(key, value);
    }
  });

  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    } else if (Array.isArray(child)) {
      // Handle nested arrays
      child.forEach(nestedChild => {
        if (typeof nestedChild === 'string') {
          element.appendChild(document.createTextNode(nestedChild));
        } else if (nestedChild instanceof Node) {
          element.appendChild(nestedChild);
        }
      });
    }
  });

  return element;
};

/**
 * Create a text node
 * @param {string} text - Text content
 * @returns {Text} Text node
 */
export const text = (text) => {
  return document.createTextNode(text);
};

/**
 * Create a fragment for batch DOM operations
 * @param {Array} children - Child nodes
 * @returns {DocumentFragment} Document fragment
 */
export const fragment = (children = []) => {
  const frag = document.createDocumentFragment();
  children.forEach(child => {
    if (typeof child === 'string') {
      frag.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      frag.appendChild(child);
    }
  });
  return frag;
};

/**
 * Clear all children from an element
 * @param {HTMLElement} element - Element to clear
 */
export const clear = (element) => {
  element.replaceChildren();
};

/**
 * Replace children of an element
 * @param {HTMLElement} element - Parent element
 * @param {Array} children - New children
 */
export const replace = (element, children = []) => {
  element.replaceChildren();
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  });
};
