import cn from 'classnames';
import { Todos } from '../../types';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

interface PropsTodos {
  todo: Todos;
}

export const TodoInfo: React.FC<PropsTodos> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const findUser = usersFromServer.find(user => user.id === userId) || null;

  return (
    <>
      <article
        data-id={id}
        className={cn('TodoInfo', {
          'TodoInfo--completed': completed,
        })}

      >
        <h2 className="TodoInfo__title">
          {title}
        </h2>

        {findUser && <UserInfo user={findUser} />}
      </article>
    </>
  );
};
