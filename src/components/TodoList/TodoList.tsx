import { TodoInfo } from '../TodoInfo';
import { ToDoType } from '../../Types/ToDoType';

type Props = {
  todos: ToDoType[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(toDo => (
        <TodoInfo key={toDo.id} todo={toDo} />
      ))}
    </section>
  );
};
