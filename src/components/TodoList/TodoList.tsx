import { TodoInfo } from '../TodoInfo';
import { ToDo } from '../type.ts/Todo';

type Props = {
  todos: ToDo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
