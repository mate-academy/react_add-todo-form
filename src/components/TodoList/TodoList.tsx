import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">

      {todos.map(todo => {
        const {
          id,
          title,
          completed,
          userId,
        } = todo;

        const user: User = users.find(CurrentUser => CurrentUser.id === userId)
          || users[0];

        return (
          <TodoInfo
            key={id}
            id={id}
            title={title}
            completed={completed}
            user={user}
          />
        );
      })}
    </section>
  );
};
