import cn from 'classnames';
import { Todos } from '../../types/Todos';

type Props = {
  postWithUser: Array<{ todo: Todos, foundUser: User }>,
};

type User = {
  id: number,
  name: string,
  username: string,
  completed: boolean,
  email: string,
};

export const TodoList: React.FC<Props> = ({
  postWithUser,
}) => {
  return (
    <section className="TodoList">
      {postWithUser.map(({ todo, foundUser }) => (
        <article
          data-id="1"
          className={cn('TodoInfo',
            { 'TodoInfo--completed': todo.completed })}
        >
          <h2 className="TodoInfo__title">
            {todo.title}
          </h2>
          {foundUser && (
            <a
              className="UserInfo"
              href={`mailto:${foundUser.email}`}
              key={todo.userID}
            >
              {foundUser.name}
            </a>
          )}
        </article>
      ))}
    </section>
  );
};
