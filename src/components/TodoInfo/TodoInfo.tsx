import cn from 'classnames';
import './TodoInfo.scss';
import { ITodoWithUser } from '../../types/todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: ITodoWithUser;
}

export const TodoInfo:React.FC<Props> = ({
  todo: {
    id,
    title,
    completed,
    user,
  },
}) => {
  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed === true,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
