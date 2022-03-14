import { Todo } from '../../types/Todo';
import './todoInfo.scss';

type Props = {
  todoInfo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todoInfo }) => (
  <p className="todoList__progress">
    Complete Status
    {' '}
    <input
      type="checkbox"
      defaultChecked={todoInfo.completed}
    />
  </p>
);
