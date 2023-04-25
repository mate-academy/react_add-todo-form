import { Todo } from '../../types/interface';
import { TodoInfo } from '../TodoInfo';

interface Props {
  visibleTodos: Todo[];
}

export const TodoList: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <section className="TodoList">
      {visibleTodos.map((todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
