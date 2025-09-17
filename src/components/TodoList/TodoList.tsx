import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types';

interface AppProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: AppProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
