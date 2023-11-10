import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({
  todo:
  {
    completed, id, title, user,
  },
}: Props) => {
  const className = cn({
    TodoInfo: true,
    'TodoInfo--completed': completed,
  });

  return (
    <article className={className} data-id={id}>
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
