import React from 'react';
import './App.css';

import todosApi from './api/todos';
import usersApi from './api/users';

import { TodoForm } from './components/TodoForm';
import { UsersList } from './components/UsersList';

class App extends React.Component {
  state = {
    todos: todosApi,
    users: usersApi,
  }

  handleAddTodo = (newTodo) => {
    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    const {
      users,
      todos,
    } = this.state;

    return (
      <div className="App">
        <header className="header">
          <h1>Add todo</h1>
        </header>
        <main className="main">
          <TodoForm
            users={users}
            handleAddTodo={this.handleAddTodo}
          />
          <section>
            <UsersList
              users={users}
              todos={todos}
            />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
