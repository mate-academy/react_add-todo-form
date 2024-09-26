import cn from 'classnames';
import { TodoUser } from '../../interfaces/todoUser';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: TodoUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
