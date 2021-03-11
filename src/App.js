import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

export class App extends React.PureComponent {
  state = {
    preparedTodos: todos.map(todo => ({
      ...todo,
      user: users.find(user => todo.userId === user.id),
    })),
  }

  addTodo = (newTodo) => {
    this.setState(oldState => (
      { preparedTodos: [...oldState.preparedTodos, newTodo] }
    ));
  }

  render() {
    const { preparedTodos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <TodoForm
          users={users}
          newTodoId={preparedTodos.length + 1}
          addTodo={this.addTodo}
        />

        <TodoList todos={preparedTodos} />

      </div>
    );
  }
}

export default App;
