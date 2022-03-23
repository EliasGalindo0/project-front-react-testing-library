import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1. Testa se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    test('Testa se o link contém o texto `Home`.',
      () => {
        renderWithRouter(<App />);
        const linkHome = screen.getByText(/Home/i);
        expect(linkHome).toBeInTheDocument();
      });

    test('Testa se o link contém o texto `About`.',
      () => {
        renderWithRouter(<App />);
        const linkAbout = screen.getByText(/About/i);
        expect(linkAbout).toBeInTheDocument();
      });

    test('Testa se o link contém o texto `Favorite Pokémons`.',
      () => {
        renderWithRouter(<App />);
        const linkFavorite = screen.getByText(/Favorite Pokémons/i);
        expect(linkFavorite).toBeInTheDocument();
      });

    test('A aplicação deve ser redirecionada para `Home` ao clicar no link.',
      () => {
        const { history } = renderWithRouter(<App />);

        const homeLink = screen.getByRole('link', { name: 'Home' });
        expect(homeLink).toBeInTheDocument();
        userEvent.click(homeLink);

        const { pathname } = history.location;
        expect(pathname).toBe('/');
      });

    test('A aplicação deve ser redirecionada para `About` ao clicar no link.',
      () => {
        const { history } = renderWithRouter(<App />);

        const aboutLink = screen.getByRole('link', { name: 'About' });
        expect(aboutLink).toBeInTheDocument();
        userEvent.click(aboutLink);

        const { pathname } = history.location;
        expect(pathname).toBe('/about');
      });

    test('A aplicação deve ser redirecionada para `Favorite Pokémons` ao clicar no link.',
      () => {
        const { history } = renderWithRouter(<App />);

        const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
        expect(favoritesLink).toBeInTheDocument();
        userEvent.click(favoritesLink);

        const { pathname } = history.location;
        expect(pathname).toBe('/favorites');
      });

    test('A aplicação deve ser redirecionada para Not Found com uma URL desconhecida.',
      () => {
        const { history } = renderWithRouter(<App />);

        history.push('/xablau');

        const notFoundTitle = screen.getByText(/Page requested not found/i);
        expect(notFoundTitle).toBeInTheDocument();
      });
  });
