import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../react-app-env';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

interface Props {
  todo: Todo,
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames(
        'todoInfo',
        {
          'todoInfo--completed': todo.completed,
        },
      )}
    >
      <h2 className="todoInfo__title">
        <p>{todo.title}</p>
        <p>{todo.completed}</p>
      </h2>
      {todo.user && (
        <UserInfo user={todo.user} />
      )}
    </article>
  );
};
