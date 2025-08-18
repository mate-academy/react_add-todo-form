import { TodoInfo } from '../TodoInfo';

// Remove local User and Todo interfaces and import Todo from a shared type definition
import { Todo } from '../TodoInfo/TodoInfo'; // Adjust the import path as needed

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  if (!todos || todos.length === 0) {
    return null;
  }

  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
