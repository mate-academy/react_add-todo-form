import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import cn from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  return (
    <article
      className={cn('TodoInfo', todo.completed && 'TodoInfo--completed')}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
