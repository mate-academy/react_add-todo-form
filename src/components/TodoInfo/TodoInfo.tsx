import cn from 'classnames';
// import todosFromServer from '../../api/todos';
import { UserInfo } from '../UserInfo';
import { getUserById } from '../services/userById';
import { Todo } from '../types/todo';

interface TodoInfoProps {
  todos: Todo[];
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todos }) => {
  return (
    <div>
      {todos.map(todo => {
        const user = getUserById(Number(todo.userId));

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
            {user && <UserInfo user={user} />}
          </article>
        );
      })}
    </div>
  );
};
