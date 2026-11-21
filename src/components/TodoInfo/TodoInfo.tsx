import { UserInfo } from '../UserInfo';

type Props = {
  todo: {
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
};

export const TodoInfo = ({ todo }: Props) => {
  return (
    <article
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
