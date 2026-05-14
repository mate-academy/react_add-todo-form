import { TodoInfo } from '../TodoInfo';
import { TodoListProps } from '../../types';

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
