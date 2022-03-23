import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('2. Testa o componente <About.js />.', () => {
  test('Testa se a página contém as informações sobre a Pokédex.',
    () => {
      render(<About />);
      const informations = screen.getByText(/This application simulates a Pokédex.../i);
      expect(informations).toBeInTheDocument();
    });

  test('Testa se a página contém um heading h2 com o texto About Pokédex.',
    () => {
      render(<About />);
      const headingH2 = screen.getByRole('heading', { name: 'About Pokédex' });
      expect(headingH2).toBeInTheDocument();
    });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex.',
    () => {
      render(<About />);
      const text1 = screen.getByText(/This application simulates a Pokédex.../i);
      const text2 = screen.getByText(/One can filter Pokémons by type, and see more.../i);
      expect(text1).toBeInTheDocument();
      expect(text2).toBeInTheDocument();
    });

  test('Testa se a página contém a imagem de uma Pokédex.',
    () => {
      render(<About />);
      const image = screen.getByAltText('Pokédex');
      expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});
