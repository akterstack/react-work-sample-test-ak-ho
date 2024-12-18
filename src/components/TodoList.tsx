import React, {ComponentProps} from 'react';
import styled from 'styled-components';
import {TodoItem} from './TodoItem';
import {useStore} from '../store';

const _TodoList: React.FC<ComponentProps<any>> = ({className}) => {
  const {todos} = useStore();

  return (
    <ul data-cy='TodoList' className={className}>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} />
      ))}
    </ul>
  );
};

export const TodoList = styled(_TodoList)`
  list-style: none;
  padding: 0;
`;
