import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Testa o componente About', () => {
  test('Verifica se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const title = screen.getByRole('heading', {
      name: /about pokédex/i,
    });

    const img = screen.getByRole('img', {
      name: /pokédex/i,
    });

    const firstText = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );

    const secondText = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );

    expect(title).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(firstText).toBeInTheDocument();
    expect(secondText).toBeInTheDocument();
  });
});
