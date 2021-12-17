import { Todo } from '../../types/Todo';
import './TodoInfo.scss';

type Props = Omit<Todo, 'user' | 'id' | 'userId'>;

export const TodoInfo: React.FC<Props> = ({ title }) => (
  <div className="task">
    <h2 className="task__title">{title}</h2>
  </div>
);
