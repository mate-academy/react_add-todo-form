import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import users from '../../api/users';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({
  todo: {
    id,
    completed,
    userId,
    title,
  },
}) => {
  const user = users.find(person => person.id === userId);

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
