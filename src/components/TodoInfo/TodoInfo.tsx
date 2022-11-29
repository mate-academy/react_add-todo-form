import cn from 'classnames';

import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  title: string,
  user: User | null,
  completed: boolean;
};

export const TodoInfo: React.FC<Props> = ({ title, user, completed }) => {
  const className = cn('TodoInfo', {
    'TodoInfo--completed': completed,
  });

  return (
    <article
      className={className}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user
        && (
          <UserInfo
            name={user.name}
            email={user.email}
            id={user.id}
          />
        )}
    </article>
  );
};
