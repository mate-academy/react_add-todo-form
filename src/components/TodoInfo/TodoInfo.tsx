import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo,
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id, title, completed, user,
  } = todo;
  const isCompleted = completed ? '--completed' : '';

  return (
    <article data-id={id} className={`TodoInfo TodoInfo${isCompleted}`}>
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} key={id} />}
    </article>
  );
};
