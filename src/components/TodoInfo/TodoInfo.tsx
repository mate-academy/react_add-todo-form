import cn from 'classnames';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
}) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const findUser = usersFromServer
    .find(user => user.id === userId) || null;

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

      {findUser && (
        <UserInfo
          user={findUser}
        />
      )}
    </article>
  );
};
