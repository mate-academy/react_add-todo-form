import { TodoInfo } from '../TodoInfo';
import { ToDo } from '../TSTypes/ToDo';

type Props = {
  todos: ToDo[]
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
