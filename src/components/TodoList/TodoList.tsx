import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../api/todos';

interface TodoInfoProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoInfoProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
