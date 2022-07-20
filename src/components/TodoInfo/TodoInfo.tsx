import React from 'react';

import './TodoInfo.css';

export interface Todo {
  title: string,
  completed: boolean,
  id: number,
  userId: number,
}

type Props = {
  todo: Todo,
};

export const TodoInfo:React.FC<Props> = ({ todo }) => (
  <div className="todo__info">
    <p className="todo__info-status" data-cy="status">
      {todo.completed
        ? ('Status: completed')
        : ('Status: no completed')}
    </p>

    <h2 className="todo__info-title" data-cy="title">{`Title: ${todo.title}`}</h2>
    <h2 className="todo__info-id" data-cy="id">{`Id: ${todo.id}`}</h2>
    <p className="todo__info-userId" data-cy="userId">{`userId: ${todo.userId}`}</p>
  </div>
);
