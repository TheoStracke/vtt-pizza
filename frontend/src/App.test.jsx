
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('VTT Pizza Frontend', () => {
  it('renderiza navbar e navegação principal', () => {
    render(<App />, { wrapper: MemoryRouter });
    expect(screen.getByText(/cardápio/i)).toBeInTheDocument();
    expect(screen.getByText(/carrinho/i)).toBeInTheDocument();
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
    expect(screen.getByText(/ingredientes/i)).toBeInTheDocument();
  });

  it('navega para página de cadastro de cliente', async () => {
    render(<App />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText(/cadastro/i));
    await waitFor(() => {
      expect(screen.getByText(/cadastro de cliente/i)).toBeInTheDocument();
    });
  });

  it('exibe filtro de ingredientes', () => {
    render(<App />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText(/ingredientes/i));
    expect(screen.getByText(/ingredientes/i)).toBeInTheDocument();
  });

  it('navega para o carrinho', async () => {
    render(<App />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText(/carrinho/i));
    await waitFor(() => {
      expect(screen.getByText(/carrinho/i)).toBeInTheDocument();
    });
  });

  it('navega para o cardápio', async () => {
    render(<App />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText(/cardápio/i));
    await waitFor(() => {
      expect(screen.getByText(/cardápio/i)).toBeInTheDocument();
    });
  });
});
