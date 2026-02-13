import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

// Renderiza a lista de TODOs — cada item é delegado ao componente TodoInfo
export const TodoList = ({ todos }: Props) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
