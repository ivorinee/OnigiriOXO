import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

/*  buttons[0] - undo button
    buttons[1] - position 1
    buttons[2] - position 2
    buttons[3] - position 3
    buttons[4] - position 4
    buttons[5] - position 5
    buttons[6] - position 6
    buttons[7] - position 7
    buttons[8] - position 8
    buttons[9] - position 9
*/

test('loads title and start button', () => {
  render(<App />);
  
  expect(screen.getByText('Pyramid')).toBeInTheDocument();
  expect(screen.getByText('Start')).toBeInTheDocument();
});

beforeEach(() => {
  render(<App />);
  fireEvent.click(screen.getByText('Start'));
});

test('generates pyramid board on start', () => {
  const buttons = screen.getAllByRole('button');

  buttons.map((button) => {
    expect(button).toBeInTheDocument();
  });
})

test('places X on an empty square', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[1]);

  expect(buttons[1]).toHaveTextContent('X');
});

test('places O on an empty square', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[1]); // X turn
  fireEvent.click(buttons[2]); // O turn

  expect(buttons[2]).toHaveTextContent('O');
});

test ('places O on a taken square, and checks square to have X', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[1]); // X turn
  fireEvent.click(buttons[1]); // O turn

  expect(buttons[1]).toHaveTextContent('X');
})

test ('checks for undo button', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[1]); // X turn
  fireEvent.click(buttons[0]); // Undo button

  expect(buttons[1]).toHaveTextContent('');
})

test ('checks that undo button can only undo once', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[1]); // X turn
  fireEvent.click(buttons[2]); // O turn
  fireEvent.click(buttons[0]); // Undo button
  fireEvent.click(buttons[0]); // Undo button

  expect(buttons[1]).toHaveTextContent('X');
  expect(buttons[2]).toHaveTextContent('');
})

test ('checks if player X has won the game (vertical)', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[1]); // X turn
  fireEvent.click(buttons[2]); // O turn
  fireEvent.click(buttons[3]); // X turn
  fireEvent.click(buttons[4]); // O turn
  fireEvent.click(buttons[7]); // X turn

  expect(screen.getByText('X won the game!')).toBeInTheDocument();
})

test ('checks if player X has won the game (horizontal)', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[5]); // X turn
  fireEvent.click(buttons[1]); // O turn
  fireEvent.click(buttons[6]); // X turn
  fireEvent.click(buttons[2]); // O turn
  fireEvent.click(buttons[7]); // X turn

  expect(screen.getByText('X won the game!')).toBeInTheDocument();
})

test ('checks if player X has won the game (positive diagonal)', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[1]); // X turn
  fireEvent.click(buttons[3]); // O turn
  fireEvent.click(buttons[2]); // X turn
  fireEvent.click(buttons[4]); // O turn
  fireEvent.click(buttons[5]); // X turn

  expect(screen.getByText('X won the game!')).toBeInTheDocument();
})

test ('checks if player X has won the game (negative diagonal)', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[1]); // X turn
  fireEvent.click(buttons[3]); // O turn
  fireEvent.click(buttons[4]); // X turn
  fireEvent.click(buttons[2]); // O turn
  fireEvent.click(buttons[9]); // X turn

  expect(screen.getByText('X won the game!')).toBeInTheDocument();
})

test ('checks for draw', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[1]); // X turn
  fireEvent.click(buttons[2]); // O turn
  fireEvent.click(buttons[3]); // X turn
  fireEvent.click(buttons[4]); // O turn
  fireEvent.click(buttons[5]); // X turn
  fireEvent.click(buttons[6]); // O turn
  fireEvent.click(buttons[8]); // X turn
  fireEvent.click(buttons[7]); // O turn
  fireEvent.click(buttons[9]); // X turn

  expect(screen.getByText('Draw!')).toBeInTheDocument();
})

test ('restarts game to generate new board', () => {
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[1]); // X turn
  fireEvent.click(buttons[2]); // O turn
  fireEvent.click(buttons[3]); // X turn
  fireEvent.click(buttons[4]); // O turn
  fireEvent.click(buttons[7]); // X turn
  fireEvent.click(screen.getByText('Restart Game'));

  buttons.forEach((button) => {
    expect(button).toHaveTextContent('');
  });
})
