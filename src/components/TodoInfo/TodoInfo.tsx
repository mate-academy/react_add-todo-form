import cn from 'classnames';
import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
  user: User;
};

export const TodoInfo: React.FC<Props> = ({
  user,
  todo,
}) => {
  const { completed, title, id } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
