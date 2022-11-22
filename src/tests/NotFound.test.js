import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Testa o component NotFound', () => {
  test('Verifica se a página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const titleEl = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(titleEl).toBeInTheDocument();
  });

  test('Verifica se a página mostra a imagem', () => {
    render(<NotFound />);
    const imgEl = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(imgEl).toBeInTheDocument();
    expect(imgEl.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
