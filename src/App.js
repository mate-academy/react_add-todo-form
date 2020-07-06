import React from 'react';
import './App.css';

import users from './api/users';
import { preparedTodos } from './components/PreparedTodos';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

class App extends React.Component {
state = {
  todos: preparedTodos,
}

addTodo = (event, newTodoItem) => {
  event.preventDefault();

  // eslint-disable-next-line no-console
  console.log('newTodoItem', newTodoItem);

  this.setState((prevState) => {
    // const newId = prevState.todos.length;
    const newId = prevState.todos.reduce((biggestId, todo) => (
      todo.id > biggestId ? todo.id : biggestId
    ), -Infinity);

    const newTodo = {
      user: users.find(usr => usr.id === +newTodoItem.userId),
      userId: newTodoItem.userId,
      id: newId,
      title: newTodoItem.title,
      completed: false,
    };

    // eslint-disable-next-line no-console
    console.log('newTodo', newTodo);

    return {
      todos: [
        ...prevState.todos,
        newTodo,
      ],
    };
  });
}

render() {
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo addTodo={this.addTodo} />
      <TodoList todolist={this.state.todos} />
      <p>
        <span>Users: </span>
        {users.length}
      </p>
    </div>
  );
}
}

export default App;
