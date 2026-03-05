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

export * from '@testing-library/react';

export { customRender as render };
export { customRenderHook as renderHook };
export { userEvent };