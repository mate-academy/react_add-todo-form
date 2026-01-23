import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type TodoListProps = {
  todos: Todo[];
  users: User[];
};

export const TodoList = ({ todos, users }: TodoListProps) => {
  const userById = new Map(users.map(user => [user.id, user]));

  return (
    <section className="TodoList">
      {todos.map(el => {
        const user = userById.get(el.userId);

        return (
          <article
            key={el.id}
            data-id="1"
            className={classNames('TodoInfo', {
              'TodoInfo--completed': el.completed,
            })}
          >
            <h2 className="TodoInfo__title">{el.title}</h2>

            {user && (
              <a className="UserInfo" href={`mailto:${user.email}`}>
                {user.name}
              </a>
            )}
          </article>
        );
      })}
    </section>
  );
};
