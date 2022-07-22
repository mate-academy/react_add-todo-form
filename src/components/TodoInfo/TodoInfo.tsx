import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={classNames(
      'TodoInfo',
      { 'TodoInfo--completed': todo.completed },
    )}
  >
    <div className="TodoInfo__task">TO DO TASK</div>

    {todo.user && (
      <UserInfo user={todo.user} />
    )}
    <p className="TodoInfo__title">
      {`Task: ${todo.title}`}

    </p>
    <p>
      {`Status: ${todo.completed ? 'Done' : 'In progress'}`}
    </p>

  </article>
);
