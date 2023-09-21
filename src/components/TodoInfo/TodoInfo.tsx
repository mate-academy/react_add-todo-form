import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { User, Todo } from '../../types';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

interface TodoInfoProps {
  todo: Todo
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const user = getUserById(todo.userId);

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {user && (
        <UserInfo
          user={user}
        />
      )}
    </article>
  );
};
