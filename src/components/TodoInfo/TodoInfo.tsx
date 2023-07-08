import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({
  todo,
}) => {
  const {
    id, title, completed, user,
  } = todo;
  const { name, email } = user;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <a className="UserInfo" href={`mailto:${email}`}>
        {name}
      </a>
    </article>
  );
};
