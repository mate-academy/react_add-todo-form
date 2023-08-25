import { TodoUser } from '../../types/TodosUser';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoUser[]
};

export const TodoList: React.FC<Props> = ({
  todos,
}) => {
  return (
    <section className="TodoList">
      {todos.map((todo: TodoUser) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
