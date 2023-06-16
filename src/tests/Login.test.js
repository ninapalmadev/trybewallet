import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a pagina de Login', () => {
  test('Testa se a pagina de login é renderizada', () => {
    renderWithRouterAndRedux(<Login />);
    const title = screen.getByText(/trybewallet/i);
    expect(title).toBeInTheDocument();
  });

  test('Testa se na rota "/" existe os input de senha e login', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/senha/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('Testa se o botão entrar está na tela e esta desabilitado', () => {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByText(/entrar/i);
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('Testa se o botão fica habilitado quando os input são preenchidos corretamente', () => {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByText(/entrar/i);
    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/senha/i);

    userEvent.type(email, 'nome@email.com');
    userEvent.type(password, '1234567');

    expect(button).not.toBeDisabled();
  });

  test('Testa se o botão fica desabilitado quando os input são preenchidos incorretamente', () => {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByText(/entrar/i);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');

    userEvent.type(email, 'nomeemail.com');
    userEvent.type(password, '1234567');

    expect(button).toBeDisabled();
  });

  test('Testa a mudança de rota ao clicar no botão', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByText(/entrar/i);

    userEvent.type(email, 'alguem@teste.com');
    userEvent.type(password, '123456');
    userEvent.click(button);
  });
});
