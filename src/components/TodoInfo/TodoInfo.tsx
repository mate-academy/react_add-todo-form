import { Post } from '../../types/types';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Post;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const todoStatus = todo.completed
    ? 'TodoInfo TodoInfo--completed'
    : 'TodoInfo';

  return (
    <article className={todoStatus} data-id={todo.id}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo?.user} />
    </article>
  );
};
