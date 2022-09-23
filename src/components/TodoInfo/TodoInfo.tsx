import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../react-app-env';

type Props = {
  todos: Todo
};

export const TodoInfo: React.FC<Props> = ({ todos }) => {
  const {
    completed,
    id,
    title,
    user,
  } = todos;

  return (
    <li
      data-id="1"
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
      key={id}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />
    </li>
  );
};
