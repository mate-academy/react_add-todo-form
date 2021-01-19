import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state={
    todos: preparedTodos,
    id: 3,
    title: '',
    userId: 0,
    userEror: false,
    titleError: false,
  }

  render() {
    const { todos: todosArr } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <form onSubmit={(event) => {
          event.preventDefault();
          if (this.state.userId > 0 && this.state.title.length > 0) {
            this.setState(state => (
              {
                todos: [...state.todos, {
                  userId: state.userId,
                  id: state.id,
                  title: state.title,
                  completed: false,
                  user: users.find(user => user.id === state.userId),
                }],
                id: state.id + 1,
              }
            ));

            this.setState({
              userId: 0,
              title: '',
            });
          } else {
            if (this.state.userId <= 0) {
              this.setState({
                userEror: true,
              });
            }

            if (this.state.title.length === 0) {
              this.setState({
                titleError: true,
              });
            }
          }
        }}
        >
          <input
            type="text"
            name="title"
            placeholder="title"
            value={this.state.title}
            onChange={(event) => {
              this.setState({ title: event.target.value });
              if (event.target.value.length > 0) {
                this.setState({ titleError: false });
              }
            }}
          />
          {this.state.titleError
          && <span className="titleError">Please enter the title</span>}
          <select
            name="user"
            value={this.state.userId}
            onChange={(event) => {
              this.setState({ userId: +event.target.value });
              if (+event.target.value > 0) {
                this.setState({ userEror: false });
              }
            }}
          >
            <option value="">
              Secelct a User
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {this.state.userEror
          && <span className="userError">Please choose a user</span>}
          <button type="submit">Add</button>
        </form>
        <br />
        <br />
        <TodoList todos={todosArr} />
      </div>
    );
  }
}

export default App;
