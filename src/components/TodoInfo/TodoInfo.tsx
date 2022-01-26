import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
}) => (
  <>
    <h2 className="todo__title">
      {todo.title}
    </h2>

    <span className={classNames(
      'todo__status',
      { 'todo__status--completed': todo.completed },
    )}
    >
      Status:
      {todo.completed
        ? ' Completed'
        : ' Not completed'}
    </span>

    {
      todo.user
        ? <UserInfo user={todo.user} />
        : <h4>Responsible person has not been chosen</h4>
    }
  </>
);
