import React, { Component } from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import FormToAddTodo from './components/TodoForm';

const todosWithUsersName = todos.map((todo) => {
  const userName = users.find(user => user.id === todo.userId).name;
  const copyTodo = {
    ...todo,
    name: userName,
  };

  return copyTodo;
});

const userNames = users.map(user => user.name);

class App extends Component {
  state = {
    todos: todosWithUsersName,
  }

addNewTodo = newTodo => this.setState(state => ({
  todos: [...state.todos, newTodo],
}));

render() {
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <p>
        <span>Users: </span>
        {users.length}
      </p>
      <TodoList
        todos={this.state.todos}
      />
      <FormToAddTodo
        names={userNames}
        todos={this.state.todos.length}
        addTodo={this.addNewTodo}
      />
    </div>
  );
}
}

export default App;
