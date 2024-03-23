import classNames from 'classnames';
import { Post } from '../../types/types';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Post;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, user, completed } = todo;

  return (
    <article
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
      data-id={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
