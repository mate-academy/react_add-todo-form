import React from 'react';
import './TodoItem.scss';

import { PrepTodo } from '../../react-app-env';

export interface Props {
  todo: PrepTodo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    id,
    name,
    userId,
    completed,
    user,
  } = todo;

  return (
    <>
      {user && (
        <p>{`UserName - ${user.name}`}</p>
      )}

      <p>{`Title - ${name}`}</p>
      <p>{`completed - ${completed}`}</p>

      <p>{`id - ${id}`}</p>
      <p>{`userId - ${userId}`}</p>
    </>
  );
};
