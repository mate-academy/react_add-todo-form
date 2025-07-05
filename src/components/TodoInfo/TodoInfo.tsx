import { Post } from '../../utils/interface';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<{ initialPost: Post }> = ({ initialPost }) => {
  return (
    <article
      data-id={`${initialPost.id}`}
      className={
        initialPost.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'
      }
    >
      <h2 className="TodoInfo__title">{initialPost.title}</h2>

      {initialPost.user && <UserInfo user={initialPost.user} />}
    </article>
  );
};
