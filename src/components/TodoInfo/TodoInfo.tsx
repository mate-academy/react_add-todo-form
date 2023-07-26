import classNames from 'classnames';
import { Todo, User } from '../types';
import { getUserByName, getUsersEmailById } from '../utilities';

type Props = {
  usersFromServer: User[];
  todos: Todo[];
};

export const TodoInfo: React.FC<Props> = ({ usersFromServer, todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => {
        return (
          <article
            key={todo.id}
            data-id={todo.id}
            className={classNames('TodoInfo', {
              'TodoInfo--completed': todo.completed,
            })}
          >
            <h2 className="TodoInfo__title">{todo.title}</h2>

            <a
              className="UserInfo"
              href={`mailto:${getUsersEmailById(usersFromServer, todo.userId)}`}
            >
              {getUserByName(usersFromServer, todo.userId)}
            </a>
          </article>
        );
      })}
    </section>
  );
};
