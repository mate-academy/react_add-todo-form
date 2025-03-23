import { Task } from '../../services/types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Task[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(task => (
        <TodoInfo todo={task} key={task.id} />
      ))}
    </section>
  );
};
