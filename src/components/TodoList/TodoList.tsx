import { Task } from '../../types/Task';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Task[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(task => (
        <TodoInfo key={task.id} todo={task} />
      ))}
    </section>
  );
};
