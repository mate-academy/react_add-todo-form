import { TodoInfo } from '../TodoInfo';
import { ListOfTodos } from '../types-of-omponents';

export const TodoList: React.FC<ListOfTodos> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
