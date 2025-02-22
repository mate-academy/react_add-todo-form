import { TodoInfo } from '../TodoInfo';
import { Task } from '../../types/Task';

type Props = {
  listOfTodos: Task[];
};
export const TodoList: React.FC<Props> = ({ listOfTodos }) => {
  return (
    <section className="TodoList">
      {listOfTodos.map((task) => (
        <TodoInfo task={task} key={task.id} />
      ))}
    </section>
  );
};
