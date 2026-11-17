import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const selectedUser = users.find(user => user.id === todo.userId);

        return selectedUser ? (
          <TodoInfo
            todo={todo}
            user={selectedUser ?? undefined}
            key={todo.id}
          />
        ) : (
          <></>
        );
      })}
    </section>
  );
};
