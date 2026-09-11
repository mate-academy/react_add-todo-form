import { ToDo } from '../../types/ToDo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: ToDo[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
