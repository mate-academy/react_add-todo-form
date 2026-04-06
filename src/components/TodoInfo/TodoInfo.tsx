import { UserInfo } from '../UserInfo';
import classNames from 'classnames';

export type TodoInfoProps = {
  todo: {
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    } | null;
    id: number;
    title: string;
    completed: boolean;
  };
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
