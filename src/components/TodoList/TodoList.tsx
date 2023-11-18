import { Todos } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: Todos[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todos) => (
        <TodoInfo
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
