// export const App = () => {
//   return (
//     <div className="App">
//       <h1>Add todo form</h1>

//       <form action="/api/todos" method="POST">
//         <div className="field">
//           <input type="text" data-cy="titleInput" />
//           <span className="error">Please enter a title</span>
//         </div>

//         <div className="field">
//           <select data-cy="userSelect">
//             <option value="0" disabled>
//               Choose a user
//             </option>
//           </select>

//           <span className="error">Please choose a user</span>
//         </div>

//         <button type="submit" data-cy="submitButton">
//           Add
//         </button>
//       </form>

//       <section className="TodoList">
//         <article data-id="1" className="TodoInfo TodoInfo--completed">
//           <h2 className="TodoInfo__title">delectus aut autem</h2>

//           <a className="UserInfo" href="mailto:Sincere@april.biz">
//             Leanne Graham
//           </a>
//         </article>

//         <article data-id="15" className="TodoInfo TodoInfo--completed">
//           <h2 className="TodoInfo__title">delectus aut autem</h2>

//           <a className="UserInfo" href="mailto:Sincere@april.biz">
//             Leanne Graham
//           </a>
//         </article>

//         <article data-id="2" className="TodoInfo">
//           <h2 className="TodoInfo__title">
//             quis ut nam facilis et officia qui
//           </h2>

//           <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
//             Patricia Lebsack
//           </a>
//         </article>
//       </section>
//     </div>
//   );
// };

import './App.scss';

import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm';

export const App = () => {
  function getUserById(userId: number): User | null {
    return usersFromServer.find(user => user.id === userId) || null;
  }

  const [todos, setTodos] = useState(todosFromServer);

  const preperedTodos: Todo[] = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const handleAddTodo = (todoInfo: Todo) => {
    const maxIndex = todos.reduce(
      (max, current) => (current.id > max ? current.id : max),
      0,
    );

    const todo: Todo = {
      ...todoInfo,
      id: maxIndex + 1,
    };

    setTodos([...todos, todo]);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <TodoForm onAdd={handleAddTodo} users={usersFromServer} />

      <TodoList todos={preperedTodos} />
    </div>
  );
};
