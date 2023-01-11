import cn from 'classnames';
import './TodoInfo.scss';
import { UserInfo } from '../UserInfo';
import { Todos } from '../../type/Todos';

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, user } = todo;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
