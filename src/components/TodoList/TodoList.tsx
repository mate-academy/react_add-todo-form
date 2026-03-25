import { TodoInfo } from '../TodoInfo';
import type { InfoRender } from '../../types/InfoRender';

type TodoListProps = {
  info: InfoRender[];
};

//.. TodoList
export const TodoList = ({ info }: TodoListProps) => {
  return (
    <section className="TodoList">
      {info.map(el => (
        <TodoInfo key={el.id} el={el} />
      ))}
    </section>
  );
};
