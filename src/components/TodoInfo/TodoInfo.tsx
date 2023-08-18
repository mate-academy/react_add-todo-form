import { User, UserInfo } from '../UserInfo';

export type Todo = {
  id: number
  title: string
  completed: boolean,
  user: User | undefined,
};

type TodoProps = {
  todo: Todo
};

export const TodoInfo = ({ todo }: TodoProps) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo${completed ? ' TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
