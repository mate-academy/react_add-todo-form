import React from 'react';
import { Form } from './Form';
import { TodosList } from './TodosList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todos,
  }

  addTodo = (todo) => {
    this.setState(prevsState => ({
      todos: [...prevsState.todos, todo],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form
          users={users}
          addTodo={this.addTodo}
        />
        <TodosList
          users={users}
          todos={this.state.todos}
        />
      </div>
    );
  }
}

export default App;
