import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types';

type Props = {
  todoItem: Todo
};

export const TodoInfo: React.FC<Props> = ({ todoItem }) => (
  <div>
    <h3>{todoItem.title}</h3>
    <span className={classNames({
      completed: todoItem.completed,
      inprogress: !todoItem.completed,
    })}
    >
      {`Status: ${todoItem.completed ? 'completed' : 'in progress'}`}
      {`UserID: ${todoItem.userId}`}
    </span>
  </div>
);
