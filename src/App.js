import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Form } from './components/Form';
import { TodoList } from './components/TodoList';

const preperadTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [...preperadTodos],
  }

  addToDo = ({ title, userId }) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, {
        id: prevState.todos.length + 1,
        title,
        user: users.find(user => user.id === userId),
      }],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <Form users={users} addToDo={this.addToDo} />
        <TodoList todos={this.state.todos} />

      </div>
    );
  }
}

export default App;
