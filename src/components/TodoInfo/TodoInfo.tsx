import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { FullTodoInfo } from '../../react-app-env.d';

type Props = {
  todo: FullTodoInfo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
    userId,
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

      {
        user && (
          <UserInfo user={user} key={userId} />
        )
      }
    </article>
  );
};
