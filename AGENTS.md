# OpenCode Agents for Vanilla JS Architecture

This document defines the specialized agents and their roles for maintaining and extending this vanilla JavaScript SPA project.

## Available Agents

### 1. **Explorer Agent** (`explore`)
**Purpose**: Contextual codebase exploration and pattern discovery.

**When to Use**:
- Finding existing component implementations
- Locating state management patterns
- Discovering routing configurations
- Identifying where business logic lives

**Common Queries**:
- "Find all components using signals"
- "Show me how routing is configured"
- "Where is the Todo feature implemented?"
- "Find all store subscriptions"

---

### 2. **Librarian Agent** (`librarian`)
**Purpose**: External research - finding docs, examples, and best practices.

**When to Use**:
- Looking up Web Components API documentation
- Finding vanilla JS performance patterns
- Researching Proxy and Signal implementations
- Discovering testing patterns for vanilla JS

**Common Queries**:
- "Find official Web Components examples"
- "Show me production vanilla JS apps using Proxy"
- "What are best practices for Event Bus implementation?"
- "Find Tailwind CSS JIT optimization examples"

---

### 3. **Frontend UI/UX Engineer Agent** (`frontend-ui-ux-engineer`)
**Purpose**: Visual and styling improvements.

**When to Use**:
- Adding or modifying Tailwind CSS classes
- Responsive design improvements
- Visual effects (hover states, transitions, animations)
- Layout restructuring

**Scope**:
- ✅ Styling, colors, spacing, layout
- ✅ Animations and transitions
- ✅ Responsive breakpoints
- ✅ Visual polish
- ❌ Business logic (handle directly)
- ❌ State management (handle directly)

**Example Tasks**:
- "Make the Todo list responsive with Tailwind"
- "Add smooth transitions to route changes"
- "Improve the Card component visual design"

---

### 4. **Document Writer Agent** (`document-writer`)
**Purpose**: Creating and maintaining project documentation.

**When to Use**:
- Writing feature guides
- Creating API documentation
- Documenting architectural patterns
- Writing tutorials for contributors

**Scope**:
- ✅ README updates
- ✅ API documentation
- ✅ Architecture guides
- ✅ Contribution guides
- ❌ Inline code comments (use LSP/explanation instead)

---

### 5. **Oracle Agent** (`oracle`)
**Purpose**: Expert architectural guidance for complex decisions.

**When to Use**:
- Designing multi-feature interactions
- Performance optimization strategies
- Complex state architecture decisions
- After 2+ failed attempts at solving a problem

**Scope**:
- ✅ Architecture reviews
- ✅ Performance optimization
- ✅ Security considerations
- ✅ Debugging complex issues
- ❌ Simple file edits (handle directly)
- ❌ First-attempt fixes (try yourself first)

---

## Agent Coordination Workflow

### Adding a New Feature

1. **Explore**: Find similar features for patterns
   ```
   "Explore how the Todo feature is structured"
   ```

2. **Librarian** (if needed): Research best practices
   ```
   "Find vanilla JS examples for form validation"
   ```

3. **Oracle** (if complex): Architectural guidance
   ```
   "Review architecture for adding user authentication"
   ```

4. **Frontend Agent** (if UI involved): Visual implementation
   ```
   "Design responsive layout for the new feature"
   ```

### Debugging Issues

1. **Explore**: Find related code
2. **Direct fix**: Attempt first fix yourself
3. **Oracle**: If 2+ attempts fail, consult Oracle
4. **Verify**: Test the solution

### Refactoring

1. **Explore**: Understand current implementation
2. **Oracle**: Review refactoring plan
3. **Direct implementation**: Apply changes
4. **Frontend Agent**: If styling needs updating

---

## Project-Specific Agent Capabilities

### Functional Components
Agents understand that components are pure functions returning DOM elements:
```javascript
export function Component() {
  return el('div', {}, []);
}
```

### State Management
Agents recognize two patterns:
1. **Global Store**: `createStore()` with Proxy
2. **Local Signals**: `createSignal()` for component state

### Routing
Agents work with the custom History API router in `src/app/router.js`

### Styling
Agents use Tailwind CSS JIT for all visual changes, avoiding separate CSS files unless necessary

---

## Anti-Patterns (Avoid These)

❌ **Using Frontend Agent for Logic**
- State management → Handle directly
- API calls → Handle directly
- Event handlers → Handle directly

❌ **Consulting Oracle Too Early**
- First attempts should be direct
- Only consult after 2+ failed tries

❌ **Skipping Exploration**
- Always explore before implementing new features
- Understand existing patterns first

✅ **Best Practices**
- Explore → Implement → Verify
- Delegate visual work to Frontend Agent
- Research external patterns with Librarian
- Consult Oracle for complex decisions only
