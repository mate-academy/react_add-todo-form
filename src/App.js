import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import TodoList from './components/TodoList/TodoList';

function App() {
  return (
    <div className="App">
      <h1>List of todos with form</h1>

      <p>
        <span>Users: </span>
        {users.length}
      </p>

      <TodoList listOfTodo={getListOfTodoWithUsers(todos, users)} />
    </div>
  );
}

function getListOfTodoWithUsers(todoArr, userArr) {
  return todoArr.map(todo => ({
    ...todo,
    user: userArr.find(item => item.id === todo.userId),
  }));
}

export default App;
