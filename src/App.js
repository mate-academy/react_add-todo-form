import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import Form from './components/Form/Form';

function usersListTodo(todosArr, usersArr) {
  return todosArr.map(todo => ({
    ...todo,
    user: usersArr.find(user => user.id === todo.userId),
  }));
}

const listOfUsers = usersListTodo(todos, users);

function App() {
  return (
    <div className="todo_list">
      <h1>LIST OF TODOS</h1>
      <span>ToDo: </span>
      <Form
        listOfUsers={listOfUsers}
      />
    </div>
  );
}

export default App;
