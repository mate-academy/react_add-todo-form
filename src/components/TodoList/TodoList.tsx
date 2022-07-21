import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          key={todo.id}
          data-id="1"
          className={classNames(
            'TodoInfo',
            {
              'TodoInfo--completed': todo.completed,
            },
          )}
        >
          <TodoInfo todo={todo} />
          {todo.user && <UserInfo user={todo.user} />}
        </article>
      ))}
    </section>
  );
};
