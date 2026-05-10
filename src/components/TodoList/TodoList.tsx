import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodoWithUser } from '../../types/types';

interface TodoListProps {
  todos: TodoWithUser[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
