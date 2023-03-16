import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
  userList: User[]
};

export const TodoList: React.FC<Props> = ({ todos, userList }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const currentUser
          = userList.find(user => user.id === todo.userId);

        if (!currentUser) {
          return null;
        }

        return (
          <TodoInfo todo={todo} user={currentUser} />
        );
      })}
    </section>
  );
};
