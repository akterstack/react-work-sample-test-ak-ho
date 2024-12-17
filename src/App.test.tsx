import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {App} from './App';

const sampleTodos = [
  {
    text: 'Todo 1',
    done: false,
    createdTimestamp: 1733505902075,
    id: 1,
  },
  {
    text: 'Todo 2',
    done: false,
    createdTimestamp: 1733505904733,
    id: 2,
  },
  {
    text: 'Todo 3',
    done: false,
    createdTimestamp: 1733505906891,
    id: 3,
  },
];

const sampleNewTodo = {
  text: 'Todo latest',
  done: false,
  createdTimestamp: Date.now(),
  id: sampleTodos.length + 1,
};

describe('App', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation((url, init) => {
      if (init && init.method === 'POST') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(sampleNewTodo),
        } as unknown as Response);
      }
      return Promise.resolve({
        json: () => Promise.resolve([...sampleTodos]),
      } as unknown as Response);
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders learn react link', async () => {
    const {findByText} = render(<App />);
    const linkElement = await findByText(/TODO APP/);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders most recent todo items first', async () => {
    const {findAllByText} = render(<App />);

    const todoElements = await findAllByText(/Todo /);
    todoElements.forEach((todoEl, i) => {
      expect(todoEl).toHaveTextContent(
        sampleTodos[sampleTodos.length - (i + 1)].text
      );
    });
  });

  it('add new todo at first', async () => {
    const {findByPlaceholderText, findByRole} = render(<App />);

    const inputEl = await findByPlaceholderText('todo title');
    fireEvent.change(inputEl, {target: {value: sampleNewTodo.text}});

    await waitFor(async () => {
      const addButton = await findByRole('button', {name: '+'});
      fireEvent.click(addButton);

      const todoElements = await screen.findAllByText(/Todo /);
      expect(todoElements[0]).toHaveTextContent(sampleNewTodo.text);
      todoElements.slice(1).forEach((todoEl, i) => {
        expect(todoEl).toHaveTextContent(
          sampleTodos[sampleTodos.length - (i + 1)].text
        );
      });
    });
  });
});
