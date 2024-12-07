import { Todo } from '../TodoList';
import { User, UserInfo } from '../UserInfo';
import classNames from 'classnames';

export const TodoInfo = ({
  todos = [],
  users = [],
}: {
  todos: Todo[];
  users: User[];
}) => {
  return (
    <>
      {todos.map(todo => (
        <article
          key={todo.id}
          data-id={todo.id}
          className={classNames('TodoInfo', {
            'TodoInfo--completed': todo.completed,
          })}
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>

          <UserInfo todoUserId={todo.userId} users={users} />
        </article>
      ))}
    </>
  );
};
