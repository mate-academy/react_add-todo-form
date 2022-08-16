import classNames from 'classnames';
import { TODO } from '../../types/TODO';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: TODO
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id, completed, title, user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
