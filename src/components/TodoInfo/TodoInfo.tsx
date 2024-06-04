import { UserInfo } from '../UserInfo';
import { TodoInfoProps } from '../../types/TodoInfoProps';
import cn from 'classnames';

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      data-id="1"
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
