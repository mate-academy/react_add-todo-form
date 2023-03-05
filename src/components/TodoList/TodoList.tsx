import classNames from 'classnames';
import { Todo, User } from '../../types';
import { UserInfo } from '../UserInfo';

type Props = {
  todos: Todo[],
  users: User[]
};

export const TodoList: React.FC<Props> = ({ todos, users }) => (
  <section className="TodoList">
    {todos.map(todo => {
      const user = users.find(u => u.id === todo.userId);

      return (
        <article
          data-id={todo.id}
          className={classNames('TodoInfo',
            {
              'TodoInfo--completed': todo.completed,
            })}
          key={todo.id}
        >
          <h2 className="TodoInfo__title">
            {todo.title}
          </h2>

          {user && <UserInfo user={user} />}
        </article>
      );
    })}
  </section>
);
