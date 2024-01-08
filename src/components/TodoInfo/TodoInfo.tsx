import { UserInfo } from '../UserInfo';
import { Todo } from '../types';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const {
    id, completed, title, userId,
  } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo  ${completed ? 'TodoInfo--completed' : ''}`}
      key={id}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      <UserInfo userId={userId} />
    </article>
  );
};
