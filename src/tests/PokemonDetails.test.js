import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemon = pokemons[0];
const { name, summary, foundAt } = pokemon;
const moreDetailsLink = 'More details';

describe('7. Testa o componente <PokemonDetails.js />',
  () => {
    test(`Testa se as informações detalhadas do Pokémon selecionado são mostradas
  na tela`, () => {
      renderWithRouter(<App />);

      const linkToDetails = screen.getByRole('link', { name: moreDetailsLink });

      userEvent.click(linkToDetails);

      const titleOfDetails = screen.getByRole('heading', { name: `${name} Details` });
      expect(titleOfDetails).toBeInTheDocument();
      expect(screen
        .queryByRole('link', { name: moreDetailsLink })).not.toBeInTheDocument();

      const titleOfSummary = screen.getByRole('heading', { name: 'Summary' });
      expect(titleOfSummary).toBeInTheDocument();
      expect(screen.getByText(summary)).toBeInTheDocument();
    });

    test(`Testa se existe na página uma seção com os mapas contendo as localizações
  do pokémon`, () => {
      renderWithRouter(<App />);

      const linkToDetails = screen.getByRole('link', { name: moreDetailsLink });

      userEvent.click(linkToDetails);

      const titleOfLocation = screen
        .getByRole('heading', { name: `Game Locations of ${name}` });

      expect(titleOfLocation).toBeInTheDocument();

      foundAt.forEach(({ location, map }, index) => {
        const img = screen.getAllByRole('img');

        expect(screen.getByText(location)).toBeInTheDocument();
        expect(img[index + 1]).toHaveAttribute('alt', `${name} location`);
        expect(img[index + 1]).toHaveAttribute('src', map);
      });
    });

    test('Testa se o usuário pode favoritar um pokémon através da página de detalhes.', (
    ) => {
      renderWithRouter(<App />);

      const linkToDetails = screen.getByRole('link', { name: moreDetailsLink });

      userEvent.click(linkToDetails);

      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toBeInTheDocument();
      expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();

      userEvent.click(checkbox);

      expect(screen.getAllByRole('img')[1])
        .toHaveAttribute('alt', `${name} is marked as favorite`);

      userEvent.click(checkbox);

      expect(screen.queryAllByRole('img')[1]).not
        .toHaveAttribute('alt', `${name} is marked as favorite`);
    });
  });
