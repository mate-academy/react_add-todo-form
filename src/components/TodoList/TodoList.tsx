// eslint-disable-next-line import/no-cycle
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: any[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
