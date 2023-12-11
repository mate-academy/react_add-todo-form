import cn from 'classnames';
import { TodoInfoProps } from '../../types';
import { UserInfo } from '../UserInfo';

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  const articleClassName
    = cn('TodoInfo', { 'TodoInfo--completed': todo.completed });

  return (
    <article
      data-id={todo.id}
      className={articleClassName}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {
        todo.user
          ? <UserInfo user={todo.user} />
          : <p>No user found</p>
      }
    </article>
  );
};
