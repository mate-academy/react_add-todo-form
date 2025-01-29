/* eslint-disable max-len */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */
// import './App.scss';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

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
import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo, User } from './components/types';

const usersFromServer: User[] = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
  // ... add more users as needed
];

const todosFromServer: Todo[] = [
  { id: 1, title: 'delectus aut autem', completed: true, userId: 1 },
  { id: 15, title: 'some other todo', completed: false, userId: 1 },
  { id: 2, title: 'quis ut nam facilis et officia qui', completed: false, userId: 2 }, // Changed userId from 4 to 2
];


export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [users] = useState<User[]>(usersFromServer);

  const addTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm users={users} onAddTodo={addTodo} todos={todos} />
      <TodoList todos={todos} users={users} />
    </div>
  );
};

export default App;


