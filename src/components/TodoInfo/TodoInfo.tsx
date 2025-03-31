import { UserInfo } from '../UserInfo';
import { Task } from './../../types/Task';

interface TodoInfoProps {
  task: Task;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ task }) => {
  const { id, title, completed, user } = task;

  return (
    <article
      data-id={id}
      key={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
      data-cy="todoItem"
    >
      <h2 className="TodoInfo__title" data-cy="todoTitle">
        {title}
      </h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
