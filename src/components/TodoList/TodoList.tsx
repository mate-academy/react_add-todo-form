// import usersFromServer from '../../api/users.json';
import { TodoInfo } from '../TodoInfo';

import { ToDo } from '../../types/todo';

// function getUserById(userId) {
//   return usersFromServer.find(user => user.id === userId)
//       || null;
// }

export const TodoList = ({ todos }: { todos: ToDo[] }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        todo={todo}
        key={todo.id}
      />
    ))}
  </section>
);
