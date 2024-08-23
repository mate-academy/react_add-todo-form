import { UserInfo } from '../UserInfo';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
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
    <article data-id={todo.id} className="TodoInfo ">
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {<UserInfo user={todo.user} />}
    </article>
  );
};
