import { TodoInfo } from '../TodoInfo';
import type { InfoRender } from '../../types/InfoRender';

type TodoListProps = {
  info: InfoRender[];
};

//.. TodoList
export const TodoList = ({ info }: TodoListProps) => {
  return (
    <section className="TodoList">
      {info.map(item => (
        <TodoInfo key={item.id} item={item} />
      ))}
    </section>
  );
};
