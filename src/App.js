import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { getTodosWithUsers } from './getTodos';
import TodoList from './components/TodoList/TodoList';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    const preparedTodos = getTodosWithUsers(todos, users);

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <input type="text" />
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}

export default App;

// import React from 'react';
// import './App.css';

// import todos from './api/todos';
// import users from './api/users';
// import TodoList from './components/TodoList/TodoList';
// import { getTodosWithUsers } from './getTodos';

// function App() {
//   const preparedTodos = getTodosWithUsers(todos, users);

//   return (
//     <TodoList todos={preparedTodos} />
//   );
// }

// export default App;
