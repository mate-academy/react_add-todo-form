import cn from 'classnames';
import todosFromServer from '../../api/todos';
import { UserInfo } from '../UserInfo';
import { getUserById } from '../services/userById';

export const TodoInfo = () => {
  return (
    <div>
      {todosFromServer.map(todo => {
        const user = getUserById(todo.userId);

        return (
          <article
            key={todo.id}
            data-id={todo.id}
            className={cn('TodoInfo', {
              'TodoInfo--completed': todo.completed,
            })}
          >
            <h2 className="TodoInfo__title">
              {todo.title}
            </h2>
            <UserInfo user={user !== null ? user : undefined} />
          </article>
        );
      })}
    </div>
  );
};
