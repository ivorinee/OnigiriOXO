import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';

beforeEach(() => {
  render(<App />);
  fireEvent.click(screen.getByText('Start'));
});

test('loads title and start button', () => {
  render(<App />);
  
  expect(screen.getByText('Pyramid TicTacToe')).toBeInTheDocument();
  expect(screen.getByText('Start')).toBeInTheDocument();
});

test('generates pyramid board on start', () => {
  const buttons = screen.getAllByRole('button');

  buttons.map((button) => {
    expect(button).toBeInTheDocument();
  });
})

test('places X on an empty square', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[0]);

  expect(buttons[0]).toHaveTextContent('X');
});

test('places O on an empty square', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[0]); // X turn
  fireEvent.click(buttons[1]); // O turn

  expect(buttons[1]).toHaveTextContent('O');
});

test ('places O on a taken square, and checks square to have X', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[0]); // X turn
  fireEvent.click(buttons[0]); // O turn

  expect(buttons[0]).toHaveTextContent('X');
})

test ('checks if player X has won the game (vertical)', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[0]); // X turn
  fireEvent.click(buttons[1]); // O turn
  fireEvent.click(buttons[2]); // X turn
  fireEvent.click(buttons[3]); // O turn
  fireEvent.click(buttons[6]); // X turn

  expect(screen.getByText('X won the game!')).toBeInTheDocument();
})

test ('checks if player X has won the game (horizontal)', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[4]); // X turn
  fireEvent.click(buttons[0]); // O turn
  fireEvent.click(buttons[5]); // X turn
  fireEvent.click(buttons[1]); // O turn
  fireEvent.click(buttons[6]); // X turn

  expect(screen.getByText('X won the game!')).toBeInTheDocument();
})

test ('checks if player X has won the game (positive diagonal)', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[0]); // X turn
  fireEvent.click(buttons[2]); // O turn
  fireEvent.click(buttons[1]); // X turn
  fireEvent.click(buttons[3]); // O turn
  fireEvent.click(buttons[4]); // X turn

  expect(screen.getByText('X won the game!')).toBeInTheDocument();
})

test ('checks if player X has won the game (negative diagonal)', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[0]); // X turn
  fireEvent.click(buttons[2]); // O turn
  fireEvent.click(buttons[3]); // X turn
  fireEvent.click(buttons[1]); // O turn
  fireEvent.click(buttons[8]); // X turn

  expect(screen.getByText('X won the game!')).toBeInTheDocument();
})

test ('checks for draw', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[0]); // X turn
  fireEvent.click(buttons[1]); // O turn
  fireEvent.click(buttons[2]); // X turn
  fireEvent.click(buttons[3]); // O turn
  fireEvent.click(buttons[4]); // X turn
  fireEvent.click(buttons[5]); // O turn
  fireEvent.click(buttons[7]); // X turn
  fireEvent.click(buttons[6]); // O turn
  fireEvent.click(buttons[8]); // X turn

  expect(screen.getByText('Draw!')).toBeInTheDocument();
})

test ('restarts game to generate new board', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[0]); // X turn
  fireEvent.click(buttons[1]); // O turn
  fireEvent.click(buttons[2]); // X turn
  fireEvent.click(buttons[3]); // O turn
  fireEvent.click(buttons[6]); // X turn
  fireEvent.click(screen.getByText('Restart Game'));

  buttons.forEach((button) => {
    expect(button).toHaveTextContent('');
  });
})
