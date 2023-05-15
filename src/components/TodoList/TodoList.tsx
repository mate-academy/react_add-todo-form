import { Task } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: Task[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
