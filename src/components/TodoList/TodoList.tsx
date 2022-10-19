import { TodoInfo } from '../TodoInfo';

import usersFromServer from '../../api/users';

import {
  Todo,
  User,
  FullTodoInfo,
} from '../../react-app-env';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const prepareTodos = (users: User[], todosArr: Todo[]): FullTodoInfo[] => {
    return todosArr.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  };

  const preparedTodos = prepareTodos(
    usersFromServer,
    todos,
  );

  return (
    <section className="TodoList">
      {
        preparedTodos.map(todo => (
          <TodoInfo todo={todo} key={todo.id} />
        ))
      }
    </section>
  );
};
