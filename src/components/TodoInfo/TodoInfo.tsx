import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
    user?: User;
  };
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user ? <UserInfo users={[todo.user]} /> : null}
    </article>
  );
};
