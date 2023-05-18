import { UserInfo, User } from '../UserInfo';

export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  user: User | null,
}

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { completed, title, user } = todo;

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
