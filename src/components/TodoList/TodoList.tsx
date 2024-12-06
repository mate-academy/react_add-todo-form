import { EnrichedTodo } from '../../types/EnrichedTodo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: EnrichedTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
