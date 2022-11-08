import { Todo, User } from '../../types';
import { TodoInfo } from '../TodoInfo';

type TodoWithUser = Todo & {
  user: User | undefined
};

type Props = {
  todos: TodoWithUser[]
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} />
      ))}
    </section>
  );
};
