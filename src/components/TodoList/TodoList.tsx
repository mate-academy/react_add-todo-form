import { User } from '../../types';
import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo';

export const TodoList = ({
  todos,
  users,
}: {
  todos: Todo[];
  users: User[];
}) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const currentUser = users.find(u => u.id === todo.userId);
        return currentUser ? (
          <TodoInfo key={todo.id} todo={todo} user={currentUser} />
        ) : null;
      })}
    </section>
  );
};
