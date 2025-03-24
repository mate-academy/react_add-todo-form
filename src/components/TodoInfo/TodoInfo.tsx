import classNames from 'classnames';

interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface Props {
  todo: Todo;
  user: User | undefined;
  onDispaptch?: (selectValue: string) => void;
}

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
        {user && user.name}
      </a>
    </article>
  );
};
