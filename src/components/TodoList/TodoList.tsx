import Todo from '../../types/Todo';
import User from '../../types/User';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList = ({ todos, users }: Props) => {
  return (
    <>
      <section>
        {todos.map(todo => (
          <TodoInfo users={users} todo={todo} key={todo.id} />
        ))}
      </section>
    </>
  );
};
