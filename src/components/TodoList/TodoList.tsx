import { Todo } from '../../types/todo';
import { User } from '../../types/user';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(u => u.id === todo.userId);

        if (!user) {
          return null;
        }

        return <TodoInfo key={todo.id} todo={todo} user={user} />;
      })}
    </section>
  );
};
