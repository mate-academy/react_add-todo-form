import { Todo } from '../../type/todo';
import { User } from '../../type/user';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Array<Todo>,
  users: Array<User>
};

export const TodoList = ({ todos, users }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return (
          <TodoInfo
            maxId={Math.max(...todos.map(el => el.id))}
            todo={todo}
            users={users}
          />
        );
      })}

    </section>
  );
};
