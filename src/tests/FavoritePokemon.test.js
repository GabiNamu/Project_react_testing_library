import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testa o componente FavoritePokemon', () => {
  test('Verifica e é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemon />);
    const textEl = screen.getByText(/no favorite pokémon found/i);
    expect(textEl).toBeInTheDocument();
  });

  test('Verifica se são exibidos todos os cards de Pokémon favoritados', () => {
    const favoritesPokemon = [pokemonList[0], pokemonList[1]];
    renderWithRouter(<FavoritePokemon pokemonList={ favoritesPokemon } />);
    const imgPikachu = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    const imgChamander = screen.getByRole('img', {
      name: /charmander sprite/i,
    });

    expect(imgPikachu).toBeInTheDocument();
    expect(imgChamander).toBeInTheDocument();
  });
});
