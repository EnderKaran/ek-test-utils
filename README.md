# ek-test-utils

Zero-config, frictionless React testing utilities. Focuses on developer experience by eliminating boilerplate and providing essential mocks out of the box.

[![Downloads](https://img.shields.io/npm/dt/ek-test-utils.svg)](https://www.npmjs.com/package/ek-test-utils)
[![npm version](https://img.shields.io/npm/v/ek-test-utils.svg)](https://www.npmjs.com/package/ek-test-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**ek-test-utils** solves the "configuration fatigue" in React testing. It wraps standard testing libraries and provides ready-to-use mocks for Next.js and browser APIs, letting you focus on writing tests instead of setting them up.

---

## Features

- **Zero Config:** Pre-configured `render` and `renderHook` with automatic provider wrapping.
- **Next.js Full Suite:** Built-in App Router mocks (`useRouter`) AND Server Component mocks (`cookies`, `headers`, `next/image`).
- **Advanced Browser Mocks:** Instantly mock `window.matchMedia`, `IntersectionObserver`, `ResizeObserver`, and `navigator.clipboard`.
- **Storage Management:** Built-in, leak-free `localStorage` and `sessionStorage` mock managers.
- **All-in-One:** Re-exports everything from `@testing-library/react` and `@testing-library/user-event`.
- **Type Safe:** Full TypeScript support.

---

## Installation

```bash
npm install -D ek-test-utils
# or
yarn add -D ek-test-utils
# or
pnpm add -D ek-test-utils
```

---

## Usage

### 1. The Basics (Drop-in Replacement)
Instead of importing from multiple testing libraries, import everything directly from `ek-test-utils`. Our custom render automatically wraps your components with necessary providers.

```tsx
import { render, screen, userEvent } from 'ek-test-utils';
import { MyButton } from './MyButton';

test('renders and clicks button', async () => {
  render(<MyButton />);
  
  const button = screen.getByRole('button', { name: /click me/i });
  await userEvent.click(button);
  
  expect(screen.getByText(/clicked/i)).toBeInTheDocument();
});
```

### 2. Testing Hooks
Easily test your custom React hooks without needing to create dummy components.

```tsx
import { renderHook } from 'ek-test-utils';
import { useCounter } from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter());
  
  // result.current.count
});
```

### 3. Next.js App Router & Server Mocks
Testing Next.js 13+ components often fails due to missing router contexts or server-only APIs. Use our built-in mocks to bypass these errors effortlessly.

```tsx
import { mockNextNavigation, mockNextHeaders, mockNextImage } from 'ek-test-utils';

// Mock Navigation (App Router)
vi.mock('next/navigation', () => mockNextNavigation());

// Mock Headers & Cookies (Server Components)
vi.mock('next/headers', () => mockNextHeaders());

// Mock next/image to behave like a standard <img> tag
vi.mock('next/image', () => mockNextImage());
```
*(Note: Use `jest.mock()` instead of `vi.mock()` if you are using Jest).*

### 4. Browser API Mocks
Prevent browser-specific errors when testing responsive components, drag-and-drop interfaces, or copy-to-clipboard functionalities.

```tsx
import { 
  setupMatchMediaMock, 
  setupIntersectionObserverMock,
  setupResizeObserverMock,
  setupClipboardMock
} from 'ek-test-utils';

// Run before your tests
beforeAll(() => {
  setupMatchMediaMock();
  setupIntersectionObserverMock();
  setupResizeObserverMock();
  setupClipboardMock();
});
```

### 5. Storage Mocks
Testing `localStorage` or `sessionStorage` can cause data leaks between tests. Use our setup function to create a clean, isolated storage environment.

```tsx
import { setupStorageMocks } from 'ek-test-utils';

beforeEach(() => {
  // Cleans and isolates storage for each test
  setupStorageMocks();
});
```

---

## 📄 License

MIT © Ender

---

## Contributing

Contributions, issues and feature requests are welcome!

---

## ⭐ Show your support

Give a ⭐️ if this project helped you!
```
