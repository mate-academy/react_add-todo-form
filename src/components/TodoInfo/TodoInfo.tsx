import { UserInfo } from '../UserInfo';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <article
        data-id={todo.id}
        key={todo.id}
        className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      >
        <h2 className="TodoInfo__title">{todo.title}</h2>
        {todo.user && <UserInfo user={todo.user} />}
      </article>
    </>
  );
};
