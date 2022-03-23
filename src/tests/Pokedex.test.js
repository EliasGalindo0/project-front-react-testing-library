import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

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
    });
});

// O botão deve conter o texto Próximo pokémon;

// Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;

// O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;

// Testa se é mostrado apenas um Pokémon por vez.

// Testa se a Pokédex tem os botões de filtro.

// Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.

// A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;

// O texto do botão deve corresponder ao nome do tipo, ex. Psychic;

// O botão All precisa estar sempre visível.

// Testa se a Pokédex contém um botão para resetar o filtro

// O texto do botão deve ser All;

// A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;

// Ao carregar a página, o filtro selecionado deverá ser All;
