import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

interface TodoInfoProps {
  todo: TodoItem;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { id, completed, title, user } = todo;

  return (
    <article
      key={id}
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {todo && <UserInfo user={user} />}
    </article>
  );
};
