import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types/Todo';

type Props = {
  post: Todo[] ;
};

export const TodoList: React.FC<Props> = ({ post }) => {
  return (
    <>
      {post.map((postUser) => (
        postUser && (
          <TodoInfo
            title={postUser.title}
            user={postUser.user}
            key={postUser.id}
          />
        )
      )) }
    </>
  );
};
