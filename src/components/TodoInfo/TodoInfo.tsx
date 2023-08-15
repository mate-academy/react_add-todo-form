import { TodoWithUser } from '../../types/TodoWithUser';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<{
  todo: TodoWithUser
  theme: 'light' | 'dark'
}> = ({ todo, theme }) => {
  const {
    title, id, completed, user,
  } = todo;

  const isCompleted = (completed && ' TodoInfo--completed') || '';

  return (
    <article data-id={id} className={`TodoInfo${isCompleted} TodoInfo--${theme}`}>
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
