import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
interface Props {
  todos: Todo[];
}
export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
