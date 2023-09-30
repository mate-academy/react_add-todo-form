import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo, User } from '../../Types/Types';

export const TodoInfo: React.FC<{ todo: Todo }> = (
  { todo: { title, completed, user } },
) => {
  return (
    <>
      <article className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
      >
        <h2 className="TodoInfo__title">
          {title}
        </h2>

        {user !== null ? <UserInfo user={user as User} /> : null}
      </article>
    </>
  );
};
