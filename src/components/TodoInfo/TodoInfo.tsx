import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const todoUser = usersFromServer.find(
    user => user.id === userId,
  ) || null;

  return (
    <article
      data-id={id}
      key={id}
      className={classNames('TodoInfo',
        { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {todoUser && (<UserInfo user={todoUser} />)}
    </article>
  );
};
