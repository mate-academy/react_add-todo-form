import { ToDoUser } from '../../types/ToDoUser';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: ToDoUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
