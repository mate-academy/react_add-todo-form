import classNames from 'classnames';

import usersFromServer from '../../api/users';

import { getUser } from '../../helperFunctions/getUser';
import { Todo } from '../../Types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({
  todo: { title, completed, userId },
}) => {
  const foundedUser = getUser(userId, usersFromServer);

  return (
    <article
      data-id="1"
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      { foundedUser && <UserInfo userId={userId} /> }
    </article>
  );
};
