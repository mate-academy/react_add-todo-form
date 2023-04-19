import classNames from 'classnames';
import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

interface TodoInfoInt {
  todo: Todo
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const TodoInfo = ({ todo }: TodoInfoInt) => {
  const getUserById = (id: number): User => {
    return usersFromServer.find((user) => user.id === id) as User;
  };

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
