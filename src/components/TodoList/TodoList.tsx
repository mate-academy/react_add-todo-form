import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/todo';
import { User } from '../../types/user';

type Props = {
  todos: Todo[],
  users: User[],
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const targetUser = users[todo.userId - 1];

        return (
          <TodoInfo
            todo={todo}
            user={targetUser}
            key={todo.id}
            data-id={todo.id}
          />
        );
      })}
    </section>
  );
};
