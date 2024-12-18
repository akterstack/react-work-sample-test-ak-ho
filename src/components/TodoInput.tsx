import React from 'react';
import styled from 'styled-components';
import {createTodo} from '../api';
import {useStore} from '../store';

const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  border-bottom: 2px solid #cfd8dc;
`;

const AddButton = styled.button`
  margin-left: 8px;
  cursor: pointer;
`;

export interface TodoInputProps {
  className?: string;
  placeholder?: string;
}

export const DEFAULT_PLACEHOLDER = 'todo title';

const _TodoInput: React.FC<TodoInputProps> = ({
  className,
  placeholder = DEFAULT_PLACEHOLDER,
}) => {
  const {addTodo} = useStore();
  const [text, setText] = React.useState('');

  const handleTextInput = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const handleAddTodo = async () => {
    if (!text) return;
    const todo = await createTodo(text);
    addTodo(todo);
    setText('');
  };

  return (
    <div data-cy='TodoInput' className={className}>
      <Input
        type='text'
        placeholder={placeholder}
        value={text}
        onChange={handleTextInput}
      />
      <AddButton onClick={handleAddTodo}>+</AddButton>
    </div>
  );
};

export const TodoInput = styled(_TodoInput)`
  display: flex;
  padding: 8px;
`;
