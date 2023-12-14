import { UserInfo } from '../UserInfo/UserInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article data-id={todo.id} className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <div className="TodoInfo__details">
        <UserInfo userId={todo.userId} />
      </div>
    </article>
  );
};
