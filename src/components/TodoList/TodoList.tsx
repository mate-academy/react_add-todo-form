import { User } from '../../Types/User';
import { Todo } from '../../Types/Todo';
import { TodoInfo } from '../TodoInfo';
import { UserInfo } from '../UserInfo';

type Props = {
  todos: Todo[],
  users: User[],
};

const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <article
          data-id={todo.id}
          className={
            todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'
          }
          key={todo.id}
        >
          <TodoInfo todo={todo} />
          {users
            .filter((user) => todo.userId === user.id)
            .map((user) => (
              <div key={user.id}>
                <UserInfo user={user} />
              </div>
            ))}
        </article>
      ))}
    </section>
  );
};

export default TodoList;
