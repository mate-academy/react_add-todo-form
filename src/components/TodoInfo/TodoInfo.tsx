import Todo from '../../types/Todo';
import User from '../../types/User';

type Props = {
  todo: Todo,
  users: User[],
};

export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  const currentUser = users.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <a className="UserInfo" href={`mailto:${currentUser?.email}`}>
        {currentUser?.name}
      </a>
    </article>
  );
};
