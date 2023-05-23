import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo,
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id, title, completed, user,
  } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo TodoInfo--${completed ? 'completed' : ''}`}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
