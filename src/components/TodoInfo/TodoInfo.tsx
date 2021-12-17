import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import './TodoInfo.scss';

type Props = Omit<Todo, 'user' | 'id' | 'userId'>;

export const TodoInfo: React.FC<Props> = ({ title, completed }) => {
  const statusClasses = classNames('task__status', { 'task__status--completed': completed });

  return (
    <div className="task">
      <div className={statusClasses} />
      <h2 className="task__title">{title}</h2>
    </div>
  );
};
