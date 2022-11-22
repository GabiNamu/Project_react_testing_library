import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App', () => {
  test('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLinkEl = screen.getByRole('link', {
      name: /home/i,
    });

    const aboutLinkEl = screen.getByRole('link', {
      name: /about/i,
    });

    const favoriteLinkEl = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    expect(homeLinkEl).toBeInTheDocument();
    expect(aboutLinkEl).toBeInTheDocument();
    expect(favoriteLinkEl).toBeInTheDocument();
  });

  test('Verifica se a aplicação é redirecionada para a página inicial ao clicar no Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLinkEl = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLinkEl);
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se a aplicação é redirecionada para a página de About ao clicar no About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLinkEl = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLinkEl);
    expect(history.location.pathname).toBe('/about');
  });

  test('Verifica se a aplicação é redirecionada para a página de Pokémon Favoritados ao clicar no favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLinkEl = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(favoriteLinkEl);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Verifica se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/purple');
    });

    const text = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(text).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });
});
