import cn from 'classnames';
import { TodoInfoProps } from '../../types';
import { UserInfo } from '../UserInfo';

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
