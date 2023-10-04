import { TodoInfo } from '../TodoInfo';
import { ToDo } from '../../types/ToDo';

interface Props {
  toDos: ToDo[]
}

export const TodoList: React.FC<Props> = ({ toDos }) => (
  <section className="TodoList">
    {toDos.map(toDo => (
      <TodoInfo
        key={toDo.id}
        toDo={toDo}
      />
    ))}
  </section>
);
