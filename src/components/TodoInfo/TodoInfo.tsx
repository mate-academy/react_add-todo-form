import { Post } from '../../types/Post';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Post;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user ? <UserInfo user={todo.user} /> : null}
  </article>
);

export default TodoInfo;
