import cn from 'classnames';
import { Completed } from '../../types/types';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Completed
}
export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    completed,
    title,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={cn(
        'TodoInfo', { 'TodoInfo--completed': completed },
      )}
      key={id}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user
      && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
