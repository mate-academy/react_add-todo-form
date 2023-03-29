import classNames from 'classnames';
import './TodoInfo.scss';
import { UserInfo } from '../UserInfo';

import { Todo } from '../../types';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <div className="todo-content">
      <article
        data-id={id}
        className={classNames(
          'TodoInfo',
          { 'TodoInfo--completed': completed },
        )}
      >

        <h2 className="TodoInfo__title">
          {title}
        </h2>

        {user
          && <UserInfo user={user} />}
      </article>
    </div>
  );
};
