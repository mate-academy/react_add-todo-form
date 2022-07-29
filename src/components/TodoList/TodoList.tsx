import { TodoInfo } from '../TodoInfo/TodoInfo';
import { List } from '../../types/List';

type Props = {
  list:List[];
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
