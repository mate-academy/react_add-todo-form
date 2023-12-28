import cn from 'classnames';
import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({
  todo: {
    id,
    title,
    completed,
    user,
  },
}) => {
  return (
    <article
      data-id={`${id}`}
      className={
        cn('TodoInfo', { 'TodoInfo--completed': completed })
      }
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
