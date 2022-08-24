import classNames from 'classnames';

import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';

type Props = {
  data: number,
  title: string,
  completed: boolean,
  user: User | null,
};

export const TodoInfo: React.FC<Props> = ({
  data,
  title,
  completed,
  user,
}) => (
  <article
    data-id={data}
    className={classNames(
      'TodoInfo',
      {
        'TodoInfo--completed': completed,
      },
    )}
  >
    <h2 className="TodoInfo__title">{title}</h2>

    {user && <UserInfo user={user} />}
  </article>
);
