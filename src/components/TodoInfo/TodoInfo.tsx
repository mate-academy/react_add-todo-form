import classNames from 'classnames';

// import
import { Post } from '../../types/types';

// Type
type Prop = { post: Post };

export const TodoInfo: React.FC<Prop> = ({ post }) => {
  const user = post.user || null;

  return (
    <article
      data-id={post.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': post.completed,
      })}
    >
      <h2 className="TodoInfo__title">{post.title}</h2>

      {post.user && (
        <a className="UserInfo" href={`mailto:${user?.email}`}>
          {user?.name}
        </a>
      )}
    </article>
  );
};
