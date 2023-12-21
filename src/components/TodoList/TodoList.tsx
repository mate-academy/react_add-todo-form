import { Todo } from '../../type/todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  toDoLists: Todo[];
};

export const ToDoList: React.FC<Props> = ({ toDoLists }) => {
  return (
    <section className="TodoList">
      {toDoLists.map((todo) => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
