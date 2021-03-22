import React from 'react';
import { Form } from './component/Form';
import { TodoList } from './component/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const todoFromServer = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export class App extends React.Component {
  state = {
    todos: todoFromServer,
  }

  addTodo = (newTodo) => {
    this.setState(prevState => ({ todos: [...prevState.todos, newTodo] }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form
          users={users}
          addTodo={this.addTodo}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
