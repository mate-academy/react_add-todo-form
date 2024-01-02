import { UserInfo, User } from '../UserInfo/UserInfo';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user?: User | null;
}

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article data-id={todo.id} className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
