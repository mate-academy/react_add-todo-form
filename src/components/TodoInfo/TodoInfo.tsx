import React from 'react';
import classNames from 'classnames';
import usersFromServer from '../../api/users';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type TodoItemType = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

type TodoInfoProps = {
  todo: TodoItemType;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const user = usersFromServer.find((userItem) => userItem.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {user && (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      )}
    </article>
  );
};
