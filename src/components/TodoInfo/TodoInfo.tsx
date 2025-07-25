import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo todo={todo} />
    </article>
  );
};
