import React, {HTMLAttributes} from 'react';
import styled from 'styled-components';
import {useStore} from '../store';

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const _TodoStatusBar: React.FC<HTMLAttributes<HTMLUListElement>> = ({
  className,
}) => {
  const {todos, totalDone} = useStore();

  return (
    <div data-cy='TodoStatusBar' className={className}>
      <InfoBar>
        <span>Total: {todos.length}</span>
        <span>Done: {totalDone}</span>
      </InfoBar>
    </div>
  );
};

export const TodoStatusBar = styled(_TodoStatusBar)`
  display: flex;
  flex-direction: column;
`;
