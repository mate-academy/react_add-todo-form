import Todo from '../../types/Todo';
import User from '../../types/User';

type Props = {
  todo: Todo,
  user: User | null,
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {user && (
        <a className="UserInfo has-text-grey" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      )}
    </article>
  );
};
