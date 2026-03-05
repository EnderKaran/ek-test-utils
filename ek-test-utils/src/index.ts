import { ReactElement } from 'react';
import { render, renderHook, RenderOptions, RenderHookOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return children; 
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

const customRenderHook = <Result, Props>(
  hook: (initialProps: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>
) => {
  return renderHook(hook, { wrapper: AllTheProviders, ...options });
};

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

export * from '@testing-library/react';

export { customRender as render };
export { customRenderHook as renderHook };
export { userEvent };