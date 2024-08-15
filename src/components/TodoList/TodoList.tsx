import { User, Todo } from '../services';
import { TodoInfo } from '../TodoInfo';

export const TodoList = ({
  users,
  todos,
}: {
  users: User[];
  todos: Todo[];
}) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(currentUser => currentUser.id === todo.userId);

        return user ? <TodoInfo user={user} todo={todo} key={todo.id} /> : null;
      })}
    </section>
  );
};
