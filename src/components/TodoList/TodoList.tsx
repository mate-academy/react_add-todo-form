import { ToDo } from '../../Types/ToDo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  toDos: ToDo[];
}

export const TodoList: React.FC<Props> = ({ toDos }) => {
  return (
    <section className="TodoList">
      {toDos.map(toDo => (
        <TodoInfo key={toDo.id} toDo={toDo} />
      ))}
    </section>
  );
};
