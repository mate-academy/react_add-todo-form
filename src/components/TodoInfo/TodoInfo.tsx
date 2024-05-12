import { UserInfo } from '../UserInfo';
import { TodoInfoProps } from '../../types';

export const TodoInfo: React.FC<TodoInfoProps> = ({
  user,
  id,
  title,
  completed,
}) => {
  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
