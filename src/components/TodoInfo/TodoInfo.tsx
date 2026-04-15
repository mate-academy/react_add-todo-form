import { UserInfo } from '../UserInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

type Props = {
  todo: Todo;
  currentUser: User;
};

export const TodoInfo: React.FC<Props> = ({ todo, currentUser }) => {
  return (
    <article
      data-id={todo.id}
      key={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={currentUser} />
    </article>
  );
};
