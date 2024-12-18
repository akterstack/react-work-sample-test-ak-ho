import React from 'react';
import styled from 'styled-components';
import {Todo} from '../types';
import {useStore} from '../store';
import {updateTodo} from '../api';

const TodoText = styled.span<{done: boolean}>`
  text-decoration: ${p => (p.done ? 'line-through' : 'none')};
`;

const TodoCheckbox = styled.input`
  margin-right: 8px;
`;

export interface TodoItemProps {
  todo: Todo;
  className?: string;
}

const _TodoItem: React.FC<TodoItemProps> = ({todo, className}) => {
  const store = useStore();

  const handleTodoCompletion = async (todo: Todo) => {
    todo.done = !todo.done;
    store.updateTodo(todo);
    try {
      await updateTodo(todo);
    } catch (e) {
      console.error(`Unexpected server error: ${e}`);
      todo.done = !todo.done;
      store.updateTodo(todo);
    }
  };

  return (
    <li data-cy='TodoItem' className={className}>
      <TodoCheckbox
        type='checkbox'
        checked={todo.done}
        onChange={() => handleTodoCompletion(todo)}
      />
      <TodoText done={todo.done}>{todo.text}</TodoText>
    </li>
  );
};

export const TodoItem = styled(_TodoItem)`
  display: flex;
  padding: 8px;
`;
