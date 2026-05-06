import { UserInfo } from '../UserInfo';

type Props = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    user: {
      name: string;
      email: string;
    };
  };
};

export const TodoInfo = ({ todo }: Props) => (
  <article
    data-id={todo.id}
    className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={todo.user} />
  </article>
);
