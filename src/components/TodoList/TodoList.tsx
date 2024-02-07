import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  visibleTodos: Todo[],
}

export const TodoList: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <section className="TodoList">
      {visibleTodos.map((todo) => (
        <TodoInfo
          key={todo.id}
          todoInfo={todo}
        />
      ))}
    </section>
  );
};
