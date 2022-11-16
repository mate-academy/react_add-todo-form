import cn from 'classnames';
import { Todos } from '../../types/Todos';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todos
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={todo.id}
      className={cn(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && (<UserInfo user={user} />)}
    </article>
  );
};
