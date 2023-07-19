import cn from 'classnames';
import { User, UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

export interface Todo {
  id: number,
  completed: boolean,
  title: string,
  userId: number,
}

export interface Props {
  key: number,
  todo: Todo,
}

const getUserById = (id: number): User => {
  return usersFromServer.find(user => user.id === id) as User;
};

export const TodoInfo = ({
  key,
  todo,
}: Props) => (
  <article
    key={key}
    data-id={todo.id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    <UserInfo user={getUserById(todo.userId)} />
  </article>
);
