import { TodoWithUser } from '../../types/TodoWithUser';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map((todo: TodoWithUser) => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
