import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testa o componente Pokemon', () => {
  test('Verifica se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite={ false } />);
    const pokemonNameEl = screen.getByText(/pikachu/i);
    const pokemonTypeEl = screen.getByText(/electric/i);
    const averageWeightEl = screen.getByText(/average weight: 6\.0 kg/i);
    const pokemonImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pokemonNameEl).toBeInTheDocument();
    expect(pokemonTypeEl).toBeInTheDocument();
    expect(averageWeightEl).toBeInTheDocument();
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Verifique se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite={ false } />);

    const linkEl = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(linkEl).toBeInTheDocument();
    expect(linkEl.href).toContain('/pokemon/25');
  });

  test('Verifica se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemonList[0] } isFavorite={ false } />,
    );

    const linkEl = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(linkEl);
    expect(history.location.pathname).toBe('/pokemon/25');
  });

  test('Verifica se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite />);

    const favoriteImgEl = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(favoriteImgEl).toBeInTheDocument();
    expect(favoriteImgEl.src).toContain('/star-icon.svg');
  });
});
