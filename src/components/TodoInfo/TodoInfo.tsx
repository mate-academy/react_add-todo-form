import { FC } from 'react';
import type { User, Todo } from '../../types';

interface TodoInfoProps {
  todo: Todo;
  userComponent: FC<{ user: User }>;
}

export const TodoInfo: FC<TodoInfoProps> = ({
  todo,
  userComponent: UserComponent,
}) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {UserComponent && <UserComponent user={user} />}
    </article>
  );
};
