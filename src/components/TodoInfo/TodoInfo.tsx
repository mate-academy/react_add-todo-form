import { Todo, User } from '../../api/types';

type Props = {
  todo: Todo;
  user?: User;
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  const { id, title, completed } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo${completed ? ' TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user ? (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      ) : (
        <span className="UserInfo">Unknown user</span>
      )}
    </article>
  );
};
