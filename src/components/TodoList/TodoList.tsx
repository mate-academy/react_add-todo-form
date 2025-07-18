// import
import { Post } from '../../types/types';
import { TodoInfo } from '../TodoInfo/TodoInfo';

//type
type Props = {
  posts: Post[];
};

export const TodoList: React.FC<Props> = ({ posts }) => {
  return (
    <section className="TodoList">
      {posts.map((post: Post) => (
        <TodoInfo key={post.id} post={post} />
      ))}
    </section>
  );
};
