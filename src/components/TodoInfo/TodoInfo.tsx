import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    id,
    user,
    completed,
  } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2
        className="TodoInfo__title"
        style={{ color: completed ? 'green' : 'red' }}
      >
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
