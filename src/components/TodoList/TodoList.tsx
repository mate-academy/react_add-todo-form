import { ToDo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

export const TodoList: React.FC<{ todos: ToDo[] }> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.userId} />
      ))}
    </section>
  );
};
