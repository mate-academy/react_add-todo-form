import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(
  todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }),
);

class App extends React.Component {
  state = {
    todosState: preparedTodos,
  }

  addTodo = todo => this.setState(prevState => ({
    todosState: [...prevState.todosState, todo],
  }))

  render() {
    const { todosState } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <Form
          users={users}
          addTodo={this.addTodo}
          todosState={todosState}
        />
        <TodoList
          todosState={todosState}
          users={users}
        />
      </div>
    );
  }
}

export default App;
