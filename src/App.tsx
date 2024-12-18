import React, {PropsWithChildren, ReactNode, useEffect} from 'react';
import styled from 'styled-components';
import {TodosFooter} from './components/TodosFooter';
import {TodosHeader} from './components/TodosHeader';
import {TodoInput} from './components/TodoInput';
import {TodoList} from './components/TodoList';
import {TodoStatusBar} from './components/TodoStatusBar';
import {AppStoreContext, useStoreReducer} from './store';
import {fetchTodos} from './api';

export const _AppContainer: React.FC<PropsWithChildren<any>> = ({
  className,
  children,
}) => {
  const storeReducer = useStoreReducer();

  useEffect(() => {
    (async () => {
      storeReducer.initTodos(await fetchTodos());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppStoreContext.Provider value={storeReducer}>
      <div className={className}>{children}</div>
    </AppStoreContext.Provider>
  );
};

const AppContainer = styled(_AppContainer)`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 400px;
  margin: 0 auto;
  height: 100vh;
`;

export const App: React.FC<ReactNode> = () => {
  return (
    <AppContainer className='App'>
      <TodosHeader>
        <TodoStatusBar />
      </TodosHeader>
      <TodoInput />
      <TodoList />
      <TodosFooter>
        <TodoStatusBar />
      </TodosFooter>
    </AppContainer>
  );
};
