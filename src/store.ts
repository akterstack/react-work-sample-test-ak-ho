import {createContext, useContext, useEffect, useState} from 'react';
import {Todo} from './types';

const sortTodos = (todos: Array<Todo>): Array<Todo> => {
  return todos.sort((a: Todo, b: Todo) => {
    if (a.createdTimestamp === b.createdTimestamp) {
      return 0;
    }
    return a.createdTimestamp < b.createdTimestamp ? 1 : -1;
  });
};

/**
 * Very basic global state reducer/hook
 */
export function useStoreReducer(): AppStore {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [totalDone, setTotalDone] = useState<number>(0);

  const countDoneTodos = (todos: Todo[]) =>
    todos.filter(todo => todo.done).length;

  const initTodos = (todos: Todo[]) => {
    setTodos(sortTodos(todos));
  };

  const addTodo = (todo: Todo) => {
    setTodos([todo, ...todos]);
  };

  useEffect(() => {
    setTotalDone(countDoneTodos(todos));
  }, [todos]);

  return {
    todos,
    totalDone,
    initTodos,
    addTodo,
  };
}

type AppState = {
  totalDone: number;
  todos: Todo[];
};

type AppStore = AppState & {
  initTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
};

const emptyTodoAppContext: AppStore = {
  todos: [],
  totalDone: 0,
  initTodos: (todos: Todo[]) => {},
  addTodo: (todo: Todo) => {},
};

export const AppStoreContext = createContext<AppStore>(emptyTodoAppContext);

export function useStore() {
  return useContext<AppStore>(AppStoreContext);
}
