import classNames from 'classnames';
import { User } from '../../Types/User';
import { Todo } from '../../Types/Todo';
import { TodoInfo } from '../TodoInfo';
import { UserInfo } from '../UserInfo';

type Props = {
  todos: Todo[],
  users: User[],
};

const TodoList: React.FC<Props> = ({ todos, users }) => {
  const todosWithUser = todos.map((todo: Todo) => ({
    ...todo,
    user: users.find((user: User) => user.id === todo.userId) as User,
  }));

  return (
    <section className="TodoList">
      {todosWithUser.map((todo) => (
        <article
          data-id={todo.id}
          className={classNames('TodoInfo', {
            'TodoInfo--completed': todo.completed,
          })}
          key={todo.id}
        >
          <TodoInfo todo={todo} />
          <div key={todo.user.id}>
            <UserInfo user={todo.user} />
          </div>
        </article>
      ))}
    </section>
  );
};

export default TodoList;
