import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Prop = {
  todo: Todo
};

export const TodoInfo: React.FC<Prop> = ({ todo }) => {
  const {
    completed,
    title,
    user,
  } = todo;

  return (
    <li className={
      classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })
    }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && <UserInfo user={user} />}
    </li>
  );
};
