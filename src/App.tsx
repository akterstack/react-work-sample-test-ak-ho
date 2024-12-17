import React from 'react';
import styled from 'styled-components';
import {TodosFooter} from './components/TodosFooter';
import {TodosHeader} from './components/TodosHeader';
import {OnSubmit, TodoInput} from './components/TodoInput';
import {TodoList} from './components/TodoList';
import {Todo} from './types';
import {TodoStatusBar} from './components/TodoStatusBar';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 400px;
  margin: 0 auto;
  height: 100vh;
`;

export interface AppState {
  todos: Array<Todo>;
}

/**
 * Sort Todo[] by createdTimestamp DESC
 */
const sortTodos = (todos: Array<Todo>): Array<Todo> => {
  return todos.sort((a: Todo, b: Todo) => {
    if (a.createdTimestamp === b.createdTimestamp) {
      return 0;
    }
    return a.createdTimestamp < b.createdTimestamp ? 1 : -1;
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3001/todos');
      const todos = await response.json();
      setTodos(sortTodos(todos));
    })();
  }, []);

  const createTodo: OnSubmit = async text => {
    const newTodo = {
      text,
      done: false,
      createdTimestamp: Date.now(),
    };

    const response = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
      window.alert(
        `Unexpected error ${response.status}: ${response.statusText}`
      );
      return text;
    }
    setTodos([await response.json(), ...todos]);
    return '';
  };

  return (
    <AppContainer className='App'>
      <TodosHeader>
        <TodoStatusBar total={todos.length} />
      </TodosHeader>
      <TodoInput onSubmit={createTodo} />
      <TodoList todos={todos} />
      <TodosFooter>
        <TodoStatusBar total={todos.length} />
      </TodosFooter>
    </AppContainer>
  );
};
