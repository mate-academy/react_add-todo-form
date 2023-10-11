import classnames from 'classnames';
import { TodoInfo } from '../TodoInfo';
import { UserInfo } from '../UserInfo';

interface TodoListProps {
  posts: Post[];
  getUserName: (userId: number) => string;
  getUserEmail: (userEmail: number) => string;
}

interface Post {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export const TodoList: React.FC<TodoListProps> = (
  { posts, getUserName, getUserEmail },
) => {
  return (
    <section className="TodoList">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <article
              data-id={post.id}
              className={classnames(
                'TodoInfo', { 'TodoInfo--completed': post.completed },
              )}
            >
              <TodoInfo post={post} />
              <UserInfo
                userName={getUserName(post.userId)}
                userLink={getUserEmail(post.userId)}
              />
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};
