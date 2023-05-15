import { Task } from '../../react-app-env';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Task;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const {
    id, completed, title, user,
  } = todo;

  return (
    <article
      data-id={id}
      key={id}
      className={`TodoInfo TodoInfo${completed ? '--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
