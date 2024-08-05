import { Post } from '../../types/Post';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Post;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article data-id="2" className="TodoInfo">
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo todo={todo} />
    </article>
  );
};
