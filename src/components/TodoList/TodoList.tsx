import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../types/Todos';

interface TodoListProps {
  todos: Todos[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <>
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </>
);
