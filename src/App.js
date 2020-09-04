import React from 'react';
import './App.css';
import ClassNames from 'classnames';
import { TodoList } from './componenets/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

class App extends React.Component {
  state = {
    todos: todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    })),
    isHidden: true,
    errorMessage: '',
  }

  timeToShowError = false;

  validation = (event) => {
    const form = event.target.closest('#formAdder');

    if (!form.title.value && this.timeToShowError) {
      this.setState({
        isHidden: false,
        errorMessage: 'enter title',
      });

      return false;
    }

    if (!form.userSelect.value && this.timeToShowError) {
      this.setState({
        isHidden: false,
        errorMessage: 'chose user',
      });

      return false;
    }

    this.setState({
      isHidden: true,
      errorMessage: '',
    });

    return true;
  }

  Add = (event) => {
    event.preventDefault();

    this.timeToShowError = true;

    if (!this.validation(event)) {
      return;
    }

    const newTodo = {
      id: [...this.state.todos].sort((a, b) => b.id - a.id)[0].id + 1,
      title: event.target.title.value,
      user: usersFromServer
        .find(user => user.id === +event.target.userSelect.value),
      completed: false,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));

    event.target.reset();
    this.timeToShowError = false;
  }

  render = () => (
    <div className="App">
      <p className={ClassNames({
        'error-message': true,
        'error-message--hidden': this.state.isHidden,
      })}
      >
        {this.state.errorMessage}
      </p>

      <h1>Add todo form</h1>

      <p>
        <span>Users: </span>
        {usersFromServer.length}
      </p>

      <form onSubmit={this.Add} id="formAdder">
        <input name="title" placeholder="title" onChange={this.validation} />
        <select name="userSelect" onChange={this.validation}>
          <option value="">Chose user</option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <button
          type="submit"
        >
          Add
        </button>
      </form>

      <TodoList preparedTodos={this.state.todos} />
    </div>
  );
}

export default App;
