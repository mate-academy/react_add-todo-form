import { FC } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Params {
  todo: Todo;
}

export const TodoInfo: FC<Params> = ({ todo }) => {
  const { id, completed, title, user } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    </article>
  );
};
