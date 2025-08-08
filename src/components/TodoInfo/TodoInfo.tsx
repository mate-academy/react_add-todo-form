import { User, Todo } from '../../types/types';

type Props = {
  todo: Todo;
  user: User;
};

export const TodoInfo: React.FC<Props> = ({ user, todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className={`TodoInfo__title`}>{todo.title}</h2>

      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    </article>
  );
};
