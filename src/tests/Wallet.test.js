import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testa a pagina Wallet', () => {
  it('testa se na rota "/carteira" existem todos os inputs esperados', () => {
    renderWithRouterAndRedux(<Wallet />);

    const currency = screen.getByTestId('currency-input');
    const value = screen.getByTestId('value-input');
    const tag = screen.getByTestId('tag-input');
    const method = screen.getByTestId('method-input');
    const description = screen.getByTestId('description-input');
    const button = screen.getByText('Adicionar despesa');

    expect(currency).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
