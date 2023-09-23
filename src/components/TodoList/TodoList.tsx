import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      <TodoInfo todos={todos} />
    </section>
  );
};
