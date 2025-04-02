import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
interface TodoInfoProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
    user?: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  };
}

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
