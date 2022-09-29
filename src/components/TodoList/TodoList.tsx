import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todos } from '../../types/Todos';

type Props = {
  list: Todos[];
};

export const TodoList: React.FC<Props> = ({ list }) => (
  <section className="TodoList">
    {
      list.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))
    }
  </section>
);
