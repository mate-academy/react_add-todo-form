import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../types/Todos';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  if (!todos) {
    return null;
  }

  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
