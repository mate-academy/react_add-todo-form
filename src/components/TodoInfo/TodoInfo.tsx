import { getUserById } from '../../servises/userBuild';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId);

  const { completed } = todo;

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
