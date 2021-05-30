import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/todosList';
import { AddTodoForm } from './components/AddTodoForm';

class App extends React.Component {
  state = {
    preparedTodos: todos.map(todo => ({
      ...todo,
      user: users.find(({ userId }) => users.id === userId),
    })),
  }

  render() {
    return (
      <>
        <div className="App">
          <AddTodoForm app={this} />
          <TodoList
            preparedTodos={this.state.preparedTodos}
          />
        </div>
      </>
    );
  }
}

export default App;
