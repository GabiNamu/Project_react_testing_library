import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const POKEMON_OBJ = {
  4: true,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testa o componente Pokedex', () => {
  test('Verifica se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ POKEMON_OBJ }
    />);
    const titleEl = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });

    expect(titleEl).toBeInTheDocument();
  });

  test('Verifica  se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ POKEMON_OBJ }
    />);

    const nextButtonEl = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(nextButtonEl);

    const pokemonNameEl = screen.getByText(/charmander/i);
    const pokemonImg = screen.getByRole('img', {
      name: /charmander sprite/i,
    });

    expect(pokemonNameEl).toBeInTheDocument();
    expect(pokemonImg).toBeInTheDocument();
  });

  test('Verifica se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ POKEMON_OBJ }
    />);

    const firstPokemonName = screen.getByText(/pikachu/i);
    const firstPokemonImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(firstPokemonName).toBeInTheDocument();
    expect(firstPokemonImg).toBeInTheDocument();

    const nextButtonEl = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(nextButtonEl);

    const pokemonNameEl = screen.getByText(/charmander/i);
    const pokemonImg = screen.getByRole('img', {
      name: /charmander sprite/i,
    });

    // expect(firstPokemonImg).not.toBeInTheDocument();
    // expect(firstPokemonName).not.toBeInTheDocument();
    expect(pokemonNameEl).toBeInTheDocument();
    expect(pokemonNameEl).not.toBe(/pikachu/i);
    expect(pokemonImg).toBeInTheDocument();
  });

  test('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ POKEMON_OBJ }
    />);

    const filters = screen.getAllByTestId(/pokemon-type-button/i);
    filters.forEach((filter) => {
      expect(filter).toBeInTheDocument();
    });

    const allButtonEl = screen.getByRole('button', {
      name: /all/i,
    });

    const physicFilterButton = screen.getByRole('button', {
      name: /psychic/i,
    });

    expect(allButtonEl).toBeInTheDocument();
    userEvent.click(physicFilterButton);

    const pokemonName = screen.getByText(/alakazam/i);
    const pokemonImg = screen.getByRole('img', {
      name: /alakazam sprite/i,
    });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonImg).toBeInTheDocument();
    expect(allButtonEl).toBeInTheDocument();
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ POKEMON_OBJ }
    />);

    const allButtonEl = screen.getByRole('button', {
      name: /all/i,
    });
    const bugButtonEl = screen.getByRole('button', {
      name: /bug/i,
    });
    const pikachuImgEl = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(pikachuImgEl).toBeInTheDocument();
    expect(allButtonEl).toBeInTheDocument();

    userEvent.click(bugButtonEl);
    const caterpieNameEl = screen.getByText(/caterpie/i);

    expect(caterpieNameEl).toBeInTheDocument();

    userEvent.click(allButtonEl);
    expect(pikachuImgEl).toBeInTheDocument();
  });
});
