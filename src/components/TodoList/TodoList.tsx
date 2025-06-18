import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};
/*Приймає todos як пропси.
Відображає кожну задачу через компонент TodoInfo*/

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
