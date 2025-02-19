import { TodoInfo } from '../TodoInfo';
import { ToDo } from '../../types/ToDo';

type Props = {
  list: ToDo[];
};

export const TodoList: React.FC<Props> = ({ list }) => {
  return (
    <section className="TodoList">
      {list.map((todo: ToDo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
