import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const AllTheProviders = ({ children}: { children: React.ReactNode }) => {
    return children;
}

//Render Fonksiyonu
const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => {
    return render(ui , { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
export { userEvent };