import classNames from 'classnames';
import { TodoWithUser } from '../../types';
import './styles.scss';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoWithUser;
};
export const TodoInfo = ({ todo: { id, completed, title, user } }: Props) => {
  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
      key={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
