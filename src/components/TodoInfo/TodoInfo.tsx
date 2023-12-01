import cn from 'classnames';
import { TodoWithUser } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoWithUser
};

export const TodoInfo = ({ todo }: Props) => {
  const {
    id,
    title,
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
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user
        ? (<UserInfo user={user} />)
        : 'User is not selected'}

    </article>
  );
};
