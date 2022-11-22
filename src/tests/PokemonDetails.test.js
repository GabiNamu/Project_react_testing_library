import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente PokemonDetails', () => {
  test('Verifica se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const linkEl = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(linkEl);

    const titleEl = screen.getByRole('heading', {
      name: /pikachu details/i,
    });

    const notLinkEl = screen.queryByRole('link', {
      name: /more details/i,
    });
    const summaryEl = screen.getByRole('heading', {
      name: /summary/i,
    });
    const textEl = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );

    expect(titleEl).toBeInTheDocument();
    expect(notLinkEl).not.toBeInTheDocument();
    expect(summaryEl).toBeInTheDocument();
    expect(textEl).toBeInTheDocument();
  });

  test('Verifica se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const linkEl = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(linkEl);

    const titleEl = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    const locationNameEl1 = screen.getByText(/kanto viridian forest/i);
    const locationNameEl2 = screen.getByText(/kanto power plant/i);
    const imgsLOcation = screen.getAllByAltText('Pikachu location');

    imgsLOcation.forEach((location) => {
      expect(location).toBeInTheDocument();
      expect(location.alt).toBe('Pikachu location');
    });
    expect(imgsLOcation[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgsLOcation[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(titleEl).toBeInTheDocument();
    expect(locationNameEl1).toBeInTheDocument();
    expect(locationNameEl2).toBeInTheDocument();
  });

  test('Verifica se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const linkEl = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(linkEl);

    const checkBoxEl = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    const checkBoxLabelEl = screen.getByText(/pokémon favoritado\?/i);

    expect(checkBoxEl).toBeInTheDocument();
    expect(checkBoxLabelEl).toBeInTheDocument();

    userEvent.click(checkBoxEl);
    const starEl = screen.queryByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(starEl).toBeInTheDocument();
    userEvent.click(checkBoxEl);
    expect(starEl).not.toBeInTheDocument();
  });
});
