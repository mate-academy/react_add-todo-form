import React, { ChangeEvent } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './Components/TodoList';

interface State {
  todos: Todo[],
  title: string,
  userId: number,
  userChange: boolean,
  titleChange: boolean,
}

class App extends React.Component<{}, State> {
  state: State = {
    todos,
    title: '',
    userId: 0,
    userChange: false,
    titleChange: false,
  };

  getUser = () => {
    return users.map((item) => ({
      ...item,
      todos: this.state.todos.filter(todo => todo.userId === item.id),
    }));
  };

  handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      titleChange: false,
    });
  };

  handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +event.target.value,
    });
    this.setState({
      userChange: false,
    });
  };

  handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (this.state.userId !== 0 && this.state.title !== '') {
      this.setState((state) => {
        const maxId = Math.max(...state.todos.map(todo => todo.id));

        return {
          todos: [
            ...state.todos,
            {
              title: state.title,
              id: maxId + 1,
              userId: state.userId,
              completed: false,
            },
          ],
          userId: 0,
          title: '',
          userChange: false,
          titleChange: false,
        };
      });
    }

    if (this.state.userId === 0) {
      this.setState({ userChange: true });
    }

    if (!this.state.title) {
      this.setState({ titleChange: true });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          onSubmit={this.handleSubmit}
          className="form"
        >
          <label htmlFor="todos">
            <input
              className="form-input"
              type="text"
              placeholder="Write you todo"
              id="todos"
              value={this.state.title}
              onChange={this.handleChangeTitle}
            />
          </label>
          {this.state.titleChange
            && <div className="error-message-input">Please enter the title</div>}
          <select
            className="form-select"
            name="user"
            value={this.state.userId}
            onChange={this.handleChangeSelect}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {this.state.userChange
            && <div className="error-message-select">Please choose a user</div>}
          <br />
          <button
            type="submit"
            className="form-button"
          >
            Add todo
          </button>
        </form>
        <TodoList users={this.getUser()} />
      </div>
    );
  }
}

export default App;
