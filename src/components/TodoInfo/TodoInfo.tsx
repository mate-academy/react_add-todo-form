import classNames from 'classnames';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Props = {
  todo: Todo;
  user: User;
};

export const TodoInfo = ({ todo, user }: Props) => {
  return (
    <article
      data-id={todo.id}
      className={classNames({
        TodoInfo: true,
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    </article>
  );
};
