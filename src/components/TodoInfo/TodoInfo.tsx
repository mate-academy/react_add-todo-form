import { ReactElement } from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo, User } from '../../types';

export const TodoInfo = ({ todo }: { todo: Todo }): ReactElement => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user as User} />
    </article>
  );
};
