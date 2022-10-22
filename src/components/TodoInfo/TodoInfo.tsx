import React from 'react';
import classNames from 'classnames';
import users from '../../api/users';
import { Todo } from '../../interface/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const { title, completed, userId } = todo;
  const user = users.find(use => userId === use.id);
  let name;
  let email;

  if (user) {
    name = user.name;
    email = user.email;
  }

  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo', {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2
        className="TodoInfo__title"
      >
        {title}
      </h2>

      <a
        href={`mailto:${email}`}
        className="UserInfo"
      >
        {name}
      </a>
    </article>
  );
};
