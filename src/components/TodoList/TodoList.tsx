import { TodoInfo } from '../TodoInfo';
import { UsersToDo } from '../../types/ToDo';

type Props = {
  todos: UsersToDo[],
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
