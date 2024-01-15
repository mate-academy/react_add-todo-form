import { User, UserInfo } from '../UserInfo';

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

interface TodoInfoProps {
  todo: Todo & {
    user?: User;
  };
  users?: User[];
}
export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo?.user && <UserInfo user={todo?.user} />}
    </article>
  );
};
