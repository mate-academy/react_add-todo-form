import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/users';
import { Todo } from '../../types/todo';

type TodoInfoType = {
  user:User | undefined;
  todo:Todo;
};

export const TodoInfo: React.FC<TodoInfoType> = ({ todo, user }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
