import { UserInfo } from '../UserInfo';

type Props = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    user: {
      name: string;
      email: string;
      id: string;
      username: string;
    };
  };
};

export const TodoInfo = ({ todo }: Props) => (
  <article
    data-id={todo.id}
    key={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={todo.user} />
  </article>
);
