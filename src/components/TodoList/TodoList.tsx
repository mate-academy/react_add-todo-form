import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo';

interface TodoProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: TodoProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
