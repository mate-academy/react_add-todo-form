import { UserInfo } from '../UserInfo/UserInfo';

type User = {
  id: string;
  name: string;
  email: string;
};

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  user?: User;
};

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => (
  <article
    key={todo.id}
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo && <UserInfo user={todo.user} />}
  </article>
);
