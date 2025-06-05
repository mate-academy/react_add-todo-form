import classNames from 'classnames';
import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type TodoItem = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoItem> = ({ todo }) => {
  const getUserById = (userId: number) => {
    return usersFromServer.find(user => user.id === userId);
  };

  const user = getUserById(todo.userId);

  if (!user) {
    return null;
  }

  const todoItem = {
    ...todo,
    user,
  };

  return (
    <article
      data-id={todoItem.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todoItem.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todoItem.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
