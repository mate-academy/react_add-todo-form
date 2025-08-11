import { Todo } from '../../interfaces/todo';
import { User } from '../../interfaces/user';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        // шукаємо користувача
        const user = users.find(u => u.id === todo.userId)!;
        // ! — гарантуємо TypeScript, що user точно існує

        return (
          <TodoInfo
            key={todo.id}
            todo={todo}
            user={user}
          />
        );
      })}
    </section>
  );
};
