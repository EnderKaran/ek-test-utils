import React, { ReactElement } from 'react';
import { render, renderHook, RenderOptions, RenderHookOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// --- 1. SARMALAYICI (WRAPPER) ---
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return children; 
};

// --- 2. CUSTOM RENDER ---
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

// --- 3. CUSTOM RENDER HOOK ---
const customRenderHook = <Result, Props>(
  hook: (initialProps: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>
) => {
  return renderHook(hook, { wrapper: AllTheProviders, ...options });
};

// --- 4. NEXT.JS APP ROUTER MOCK ---
export const mockNextNavigation = () => ({
  useRouter: () => ({
    push: () => {},
    replace: () => {},
    prefetch: () => {},
    back: () => {},
    refresh: () => {},
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
});

// --- 5. MATCH MEDIA MOCK ---
export const setupMatchMediaMock = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
};

// --- 6. INTERSECTION OBSERVER MOCK ---
export const setupIntersectionObserverMock = () => {
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
};

// --- 7. KATEGORİ 1: RESIZE OBSERVER & CLIPBOARD (YENİ v1.3.0) ---
export const setupResizeObserverMock = () => {
  class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: MockResizeObserver,
  });
};

export const setupClipboardMock = () => {
  Object.defineProperty(navigator, 'clipboard', {
    writable: true,
    configurable: true,
    value: {
      writeText: () => Promise.resolve(),
      readText: () => Promise.resolve(''),
    },
  });
};

// --- 8. KATEGORİ 2: NEXT.JS SERVER COMPONENTS MOCK (YENİ v1.3.0) ---
export const mockNextHeaders = () => {
  const mockHeadersMap = new Map();
  const mockCookiesMap = new Map();
  
  return {
    headers: () => ({
      get: (key: string) => mockHeadersMap.get(key) || null,
      set: (key: string, value: string) => mockHeadersMap.set(key, value),
    }),
    cookies: () => ({
      get: (key: string) => mockCookiesMap.get(key) || null,
      set: (key: string, value: string) => mockCookiesMap.set(key, value),
      delete: (key: string) => mockCookiesMap.delete(key),
    }),
  };
};

export const mockNextImage = () => {
  return {
    __esModule: true,
    default: (props: any) => {
      // next/image özel proplarını ayıklayıp standart HTML img elementi dönüyoruz
      const { priority, fetchPriority, placeholder, blurDataURL, ...rest } = props;
      return React.createElement('img', rest);
    },
  };
};

// --- 9. KATEGORİ 3: STORAGE MOCK SİSTEMİ (YENİ v1.3.0) ---
const createStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (index: number) => Object.keys(store)[index] || null,
  };
};

export const setupStorageMocks = () => {
  Object.defineProperty(window, 'localStorage', {
    writable: true,
    configurable: true,
    value: createStorageMock(),
  });
  
  Object.defineProperty(window, 'sessionStorage', {
    writable: true,
    configurable: true,
    value: createStorageMock(),
  });
};

// Standart araçları dışarı aktar
export * from '@testing-library/react';
export { customRender as render };
export { customRenderHook as renderHook };
export { userEvent };