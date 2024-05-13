import { UserInfo } from '../UserInfo';
import { TodoInfoProps } from '../../types';

export const TodoInfo: React.FC<TodoInfoProps> = ({
  user,
  id,
  title,
  completed,
}) => {
  const todoClass = completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo';

  return (
    <article data-id={id} className={todoClass}>
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
