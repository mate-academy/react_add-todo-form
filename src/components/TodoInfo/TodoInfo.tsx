import classNames from 'classnames';

import { User } from '../../types/User';

import { UserInfo } from '../UserInfo';

type Props = {
  title: string,
  id: number,
  completed: boolean,
  user: User | null,
};

export const TodoInfo: React.FC<Props> = ({
  title,
  id,
  completed,
  user,
}) => {
  return (
    <li
      data-id={id}
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo
          user={user}
        />
      )}
    </li>
  );
};
