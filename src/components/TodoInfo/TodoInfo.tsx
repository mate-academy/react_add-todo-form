import { getUserById } from '../../services/GetUserById';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Todo,
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const {
    id, completed, title, userId,
  } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed && ('TodoInfo--completed')}`}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      <UserInfo user={getUserById(userId)} />
    </article>
  );
};
