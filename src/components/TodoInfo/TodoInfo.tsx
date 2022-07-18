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
    <div className="todo__info-status" data-cy="status">
      {todo.completed
        ? ('Status: completed')
        : ('Status: no completed')}
    </div>

    <div className="todo__info-title" data-cy="title">{`Title: ${todo.title}`}</div>
    <div className="todo__info-id" data-cy="id">{`Id: ${todo.id}`}</div>
    <div className="todo__info-userId" data-cy="userId">{`userId: ${todo.userId}`}</div>
  </div>
);
