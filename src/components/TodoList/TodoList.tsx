import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../App';

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
