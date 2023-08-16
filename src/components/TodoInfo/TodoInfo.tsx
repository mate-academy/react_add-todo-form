import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { TodoInfoProps } from '../../types/TodoInfoProps';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const getUserById = (id: number): User => {
  return usersFromServer.find((user) => user.id === id) as User || null;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={getUserById(todo.userId)} />
    </article>
  );
};
