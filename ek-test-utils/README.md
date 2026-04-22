# ek-test-utils

Zero-config, frictionless React testing utilities. Focuses on developer experience by eliminating boilerplate and providing essential mocks out of the box.

[![Downloads](https://img.shields.io/npm/dt/ek-test-utils.svg)](https://www.npmjs.com/package/ek-test-utils)
[![npm version](https://img.shields.io/npm/v/ek-test-utils.svg)](https://www.npmjs.com/package/ek-test-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**ek-test-utils** solves the "configuration fatigue" in React testing. It wraps standard testing libraries and provides ready-to-use mocks for Next.js and browser APIs, letting you focus on writing tests instead of setting them up.

---

## Features

- **Zero Config:** Pre-configured `render` and `renderHook` with automatic provider wrapping.
- **Next.js Ready:** Built-in App Router mocks (`useRouter`, `usePathname`, etc.) to prevent Next.js specific testing errors.
- **Browser Mocks:** Instantly mock `window.matchMedia` and `IntersectionObserver` for Jest and Vitest.
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
Instead of importing from multiple testing libraries, import everything directly from ek-test-utils. Our custom render automatically wraps your components with necessary providers.

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
### 3. Next.js App Router Mock
Testing Next.js 13+ components often fails due to missing router contexts. Use our built-in mock to bypass this.

```tsx
import { mockNextNavigation } from 'ek-test-utils';

// If using Vitest:
vi.mock('next/navigation', () => mockNextNavigation());

// If using Jest:
jest.mock('next/navigation', () => mockNextNavigation());
```
### 4. Browser API Mocks
Prevent window.matchMedia and IntersectionObserver errors when testing responsive components or scroll animations. You can add these to your global setup file (e.g., setupTests.ts) or inside individual test files.

```tsx
import { setupMatchMediaMock, setupIntersectionObserverMock } from 'ek-test-utils';

// Run before your tests
beforeAll(() => {
  setupMatchMediaMock();
  setupIntersectionObserverMock();
});
```
---
## 📄 License

MIT ©

---

## Contributing

Contributions, issues and feature requests are welcome!

---

## Show your support

Give a ⭐️ if this project helped you!
