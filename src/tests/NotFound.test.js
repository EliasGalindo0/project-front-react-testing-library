import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('4. Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading h2 com o texto Page requested not found.',
    () => {
      render(<NotFound />);

      const notFound = screen.getByText(/Page requested not found/i);
      expect(notFound).toBeInTheDocument();
    });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.',
    () => {
      render(<NotFound />);

      const image = screen.getByAltText(
        'Pikachu crying because the page requested was not found',
      );
      expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
