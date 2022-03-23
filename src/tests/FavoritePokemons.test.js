import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('3. Testa o componente <FavoritePokemons.js />', () => {
  test('Testa se é exibido: `No favorite pokemon found`, caso não tenha favoritos.',
    () => {
      render(<FavoritePokemons />);

      const messageNotFound = screen.getByText('No favorite pokemon found');
      expect(messageNotFound).toBeVisible();
    });

  test('Testa se é exibido todos os cards de pokémons favoritados.',
    () => {
      render(<FavoritePokemons />);

      const favoritePokemons = screen.getByText(/Favorite pokémons/i);
      expect(favoritePokemons).toBeVisible();
    });
});
