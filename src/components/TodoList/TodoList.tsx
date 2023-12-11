import { TodoListProps } from '../../types';
import { TodoInfo } from '../TodoInfo';

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {
        todos.map(todo => {
          return (
            <TodoInfo key={todo.id} todo={todo} />
          );
        })
      }
    </section>
  );
};
