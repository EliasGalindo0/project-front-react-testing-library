import { render, screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../components';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido: `No favorite pokemon found`, caso não tenha favoritos.',
    () => {
      render(<FavoritePokemons />);

      const messageNotFound = screen.getByText('No favorite pokemon found');
      expect(messageNotFound).toBeVisible();
    });

  test('Teste se é exibido todos os cards de pokémons favoritados.',
    () => {
      render(<FavoritePokemons />);

      const favoritePokemons = screen.getByText(/Favorite pokémons/i);
      expect(favoritePokemons).toBeVisible();
    });
});

// 3. Teste o componente <FavoritePokemons.js />
// Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.

// Teste se é exibido todos os cards de pokémons favoritados.
