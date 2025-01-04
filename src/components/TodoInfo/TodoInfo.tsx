import React from 'react';
import classNames from 'classnames';

type TodoProps = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
  };
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export const TodoInfo: React.FC<TodoProps> = ({ todo, user }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
        'TodoInfo--active': !todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    </article>
  );
};
