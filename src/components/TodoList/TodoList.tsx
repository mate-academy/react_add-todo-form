import { TodoInfo } from '../TodoInfo';
import { Task } from './../../types/Task';

export const TodoList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <section className="TodoList" data-cy="todoList">
      {tasks.map(task => (
        <TodoInfo key={task.id} task={task} />
      ))}
    </section>
  );
};
