import classNames from 'classnames';
import { Todo, User } from '../../types';
import { UserInfo } from '../UserInfo';

type Props = {
  todos: Todo[],
  users: User[]
};

export const TodoList = (props: Props) => {
  const { todos, users } = props;

  return (
    <section className="TodoList">
      {todos.map(t => {
        const user = users.find(u => u.id === t.userId);

        return (
          <article
            data-id={t.id}
            className={classNames('TodoInfo',
              { TodoInfo: !t.completed, 'TodoInfo--completed': t.completed })}
            key={t.id}
          >
            <h2 className="TodoInfo__title">
              {t.title}
            </h2>

            {user && <UserInfo user={user} />}
          </article>
        );
      })}
    </section>
  );
};
