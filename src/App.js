import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todos,
    todo: '',
    noTitle: false,
    noSelect: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.todo && !this.state.userId) {
      this.setState({
        noTitle: true,
        noSelect: true,
      });

      return;
    }

    if (!this.state.todo) {
      this.setState({
        noTitle: true,
      });

      return;
    }

    if (!this.state.userId) {
      this.setState({
        noSelect: true,
      });

      return;
    }

    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          userId: state.userId,
          id: state.todos.length + 1,
          title: state.todo,
          name: state.user,
          completed: false,
        },
      ],
      todo: '',
      userId: 0,
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        {this.state.todos.map(todo => (
          <div key={todo.id}>
            to-do ID =
            {todo.id}
            {` / `}
            title =
            {todo.title}
            {' - added by '}
            {users.find(user => +user.id === +todo.userId).name}
            (
            {todo.userId}
            )
          </div>
        ))}
        <form
          onSubmit={(event) => {
            this.handleSubmit(event);
          }}
        >
          <input
            placeholder="Add a todo"
            value={this.state.todo}
            onChange={(event) => {
              this.setState({
                todo: event.target.value,
                noTitle: false,
              });
            }}
          />
          <span>{this.state.noTitle && 'Please add a todo'}</span>
          <br />
          <select
            value={this.state.userId}
            onChange={(event) => {
              this.setState({
                userId: event.target.value,
                noSelect: false,
              });
            }}
          >
            <option value={0} disabled>Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <span>{this.state.noSelect && 'Please choose a user'}</span>
          <br />
          <button type="submit">Add a todo</button>
        </form>
      </div>
    );
  }
}

export default App;
