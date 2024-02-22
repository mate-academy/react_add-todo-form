import { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [users] = useState([...usersFromServer]);
  const userById = users.find((user: User) => user.id === todo.userId);

  return (
    <article
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {userById && <UserInfo user={userById} />}
    </article>
  );
};
