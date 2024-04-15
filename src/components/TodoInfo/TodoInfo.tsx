import { ToDo } from '../../types/ToDo';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: ToDo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
