import classNames from 'classnames';
import { Post } from '../../types/Post';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Post;
};

export const TodoInfo: React.FC<Props> = ({
  todo: { completed, title, user },
}) => {
  return (
    <article
      data-id="2"
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
