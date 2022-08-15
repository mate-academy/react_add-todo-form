import Todo from '../../types/Todo';
import users from '../../api/users';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const currentUser = users.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <a className="UserInfo has-text-grey" href={`mailto:${currentUser?.email}`}>
        {currentUser?.name}
      </a>
    </article>
  );
};
