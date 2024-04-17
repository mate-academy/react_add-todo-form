import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { ToDo } from '../../types/ToDo';

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, completed, title, user } = todo;

  return (
    <article
      data-id={`${id}`}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};