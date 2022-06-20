import React from 'react';
import { ToDos } from '../../react-app-env';

interface Props {
  todo: ToDos;
}

const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <div>
      <p data-cy="title">{`Task: ${title}`}</p>
      <p>{`Status: ${completed ? 'Task completed' : 'Task in progress'}`}</p>
      <p>{`Id: ${user ? user.id : 'No Id'}`}</p>
    </div>
  );
};

export default TodoInfo;
