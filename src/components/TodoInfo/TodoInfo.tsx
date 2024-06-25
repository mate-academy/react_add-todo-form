import cn from 'classnames';
import { TodoCard } from '../../types/TodoCard';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoCard;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    key={todo.id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={todo.user} />
  </article>
);
