import classNames from 'classnames';
import { Todo } from '../../types/interface';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    user,
    completed,
    title,
  } = todo;

  return (
    <article
      data-id={id}
      className={
        classNames('TodoInfo', {
          'TodoInfo--completed': completed,
        })
      }
    >

      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
