import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  name: (users.find(user => user.id === todo.userId)).name,
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    todo: '',
    user: '',
    noTitle: false,
    noSelect: false,
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        {this.state.todos.map(todo => (
          <div key={todo.id}>{todo.title}</div>
        ))}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!this.state.todo && !this.state.user) {
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

            if (!this.state.user) {
              this.setState({
                noSelect: true,
              });

              return;
            }

            this.setState(state => ({
              todos: [
                ...state.todos,
                {
                  id: todos.length + 1,
                  userId: users.find(user => user.name === state.user).id,
                  title: state.todo,
                  name: state.user,
                  completed: false,
                },
              ],
              todo: '',
              user: '',
            }));
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
            value={this.state.user}
            onChange={(event) => {
              this.setState({
                user: event.target.value,
                noSelect: false,
              });
            }}
          >
            <option value="" disabled>Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.name}>
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
