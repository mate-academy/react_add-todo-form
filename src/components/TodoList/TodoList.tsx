import { TodoInfo } from '../TodoInfo';
import { UsersToDos } from '../../types/ToDo';

type Props = {
  todos: UsersToDos[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      { todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
