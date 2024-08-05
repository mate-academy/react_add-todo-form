import classNames from 'classnames';
import { Post } from '../../types/Post';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Post;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id="2"
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
