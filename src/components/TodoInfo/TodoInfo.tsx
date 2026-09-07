import { UserInfo } from '../UserInfo';

type Props = {
  todo: {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
    user?: {
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
      className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
