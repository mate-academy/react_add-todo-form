import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';
import { Todos } from '../../types/Todos';

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { user, title, completed } = todo;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >

      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
