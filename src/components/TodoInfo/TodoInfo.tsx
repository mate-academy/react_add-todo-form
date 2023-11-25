import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types';

interface TodoInfoProps {
  todo: Todo;
  // user?: User;
}

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      {todo.user
      && <UserInfo user={todo.user} />}
    </article>
  );
};
