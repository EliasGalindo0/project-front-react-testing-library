import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

const id = 'pokemon-name';
const pokemonTypes = [...new Set(pokemons
  .reduce((types, { type }) => [...types, type], []))];

describe('5. Testa o componente <Pokedex.js />', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons.',
    () => {
      renderWithRouter(<App />);

      const encountered = screen
        .getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
      expect(encountered).toBeInTheDocument();
    });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão pokémon é clicado.',
    () => {
      renderWithRouter(<App />);

      const nextPokemon = screen
        .getByRole('button', { name: /Próximo pokémon/i });
      expect(nextPokemon).toBeInTheDocument();
      userEvent.click(nextPokemon);

      const pokemonLenght = screen.getByTestId(id);
      expect(pokemonLenght).toBeInTheDocument();
      userEvent.click(nextPokemon);
    });

  test('Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId(id);
    expect(pokemon).toHaveLength(1);
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<App />);

    const typeBtn = screen.getAllByTestId('pokemon-type-button');
    const allBtn = screen.getByRole('button', { name: 'All' });

    userEvent.click(typeBtn[2]);

    expect(screen.getByTestId(id)).not.toHaveTextContent(pokemons[0].name);

    userEvent.click(allBtn);

    expect(screen.getByTestId(id)).toHaveTextContent(pokemons[0].name);
  });

  test('Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const filterTypeBtn = screen.getAllByTestId('pokemon-type-button');
    const allPokemonsBtn = screen.getByRole('button', { name: 'All' });
    expect(allPokemonsBtn).toBeInTheDocument();
    expect(filterTypeBtn).toHaveLength(pokemonTypes.length);

    filterTypeBtn.forEach((button, index) => {
      expect(button).toHaveTextContent(pokemonTypes[index]);

      userEvent.click(button);

      const typeOfPokemons = pokemons
        .filter((pokemon) => pokemon.type === button.innerHTML);
      const next = screen.getByTestId('next-pokemon');

      if (typeOfPokemons.length <= 1) {
        expect(next).toBeDisabled();
      } else {
        let currPokemon = screen.getByTestId(id);

        expect(currPokemon).toHaveTextContent(typeOfPokemons[0].name);

        userEvent.click(next);

        currPokemon = screen.getByTestId(id);
        expect(currPokemon).toHaveTextContent(typeOfPokemons[1].name);
      }
    });
  });
});
