import { Todo, User } from '../types';
type Props = {
  todo: Todo;
  user: User;
};
export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  return (
    <article
      data-id={todo.id}
      className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title" data-cy="titleInput">
        {todo.title}
      </h2>
      <a className="UserInfo" href={user?.email}>
        {user?.name}
      </a>
    </article>
  );
};
