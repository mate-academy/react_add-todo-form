import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type TodoListProps = {
  todos: Todo[];
  users: User[];
};

export const TodoList = ({ todos, users }: TodoListProps) => {
  const userById = new Map(users.map(user => [user.id, user]));

  return (
    <section className="TodoList">
      {todos.map(el => {
        const user = userById.get(el.userId);

        return <TodoInfo key={el.id} todo={el} user={user} />;
      })}
    </section>
  );
};
