import { Todo } from '../../types/types';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
