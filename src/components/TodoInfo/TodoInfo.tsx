import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={`${id}`}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user ? (
        <UserInfo user={user} />
      ) : (
        <span className="error">User not found</span>
      )}
    </article>
  );
};
