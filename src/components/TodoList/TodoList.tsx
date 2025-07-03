import { TodoInfo } from '../TodoInfo';
import { User, Todo } from '../Types/Types';

type TodoListProps = {
  todos: Todo[];
  users: User[];
};

export const TodoList = ({ todos, users }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} users={users} />
      ))}
    </section>
  );
};
