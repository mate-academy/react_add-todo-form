import { UserInfo } from '../UserInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo: todoItem }: Props) => {
  return (
    <article
      data-id={todoItem.id}
      className={`TodoInfo ${todoItem.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todoItem.title}</h2>

      <UserInfo user={todoItem.user} />
    </article>
  );
};
