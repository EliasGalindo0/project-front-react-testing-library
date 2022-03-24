import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { Pokemon } from '../components';

const moreDetailsLink = 'More details';

describe('6. Testa o componente <Pokemon.js />', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
      const { name, type, image, averageWeight } = pokemons[0];
      const { measurementUnit, value } = averageWeight;

      const namePokemon = screen.getByTestId('pokemon-name');
      const typePokemon = screen.getByTestId('pokemon-type');
      const weightPokemon = screen.getByTestId('pokemon-weight');
      const spritePokemon = screen.getByRole('img');

      expect(namePokemon).toHaveTextContent(name);
      expect(typePokemon).toHaveTextContent(type);
      expect(spritePokemon).toHaveAttribute('src', image);
      expect(spritePokemon).toHaveAttribute('alt', `${name} sprite`);
      expect(weightPokemon)
        .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    });

  test('Testa se o card do Pokémon contém um link para exibir detalhes deste.',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

      const linkToDetails = screen.getByRole('link', { name: moreDetailsLink });
      expect(linkToDetails).toBeInTheDocument();
      expect(linkToDetails).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
    });

  test('Testa se é redirecioando para os detalhes ao clicar no link.',
    () => {
      renderWithRouter(<App />);

      const linkToDetails = screen.getByRole('link', { name: moreDetailsLink });
      userEvent.click(linkToDetails);

      const title = screen.getByRole('heading', {
        name: `${pokemons[0].name} Details`, level: 2 });
      expect(title).toBeInTheDocument();
    });

  test('Testa se a URL exibida no navegador muda para /pokemon/<id>.',
    () => {
      const { history } = renderWithRouter(<Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
      />);
      const linkToDetails = screen.getByRole('link', { name: moreDetailsLink });
      userEvent.click(linkToDetails);

      expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
    });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados.',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

      const favoritePokemons = screen.getAllByRole('img');

      expect(favoritePokemons[1]).toHaveAttribute('src', '/star-icon.svg');
      expect(favoritePokemons[1])
        .toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
    });
});
