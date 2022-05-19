import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';
import './TodoItem.scss';

type Props = {
  todoItem: Todo;
};

export const TodoItem: React.FC<Props> = ({ todoItem }) => (
  <>
    <p>
      {`Name: ${todoItem.user?.username}`}
    </p>
    <p>
      {`Email: ${todoItem.user?.email}`}
    </p>
    <p className={classNames(todoItem.completed
      ? 'completed'
      : 'active')}
    >
      {`To do: ${todoItem.title}`}
    </p>
  </>
);
