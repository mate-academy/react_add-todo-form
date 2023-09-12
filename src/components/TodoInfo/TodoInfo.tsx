import classNames from 'classnames';
import { TodoWithUser } from '../../types';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

interface Props {
  todo: TodoWithUser;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    user,
    completed = false,
    id,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
