import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article className={classNames(
    'TodoInfo',
    { 'TodoInfo--completed': todo.completed === true },
  )}
  >
    <div className="TodoInfo__task">TO DO TASK</div>

    <UserInfo user={todo.user} />
    <p className="TodoInfo__title">
      {`Task: ${todo.title}`}

    </p>
    <p>
      {`Status: ${todo.completed ? 'Done' : 'In progress'}`}
    </p>

  </article>
);
