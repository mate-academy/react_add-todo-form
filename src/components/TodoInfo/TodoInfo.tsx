import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { ToDo } from '../../types/ToDo';

type Props = {
  todo: ToDo;
};

export const TodoInfo = ({ todo }: Props) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
