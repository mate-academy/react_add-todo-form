import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './TodoList';

interface State {
  myTodos: Todo[],
  myUsers: User[],
  title: string,
  userId: string,
  titleError: boolean,
  userError: boolean,
}

type Event = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

class App extends React.Component<{}, State> {
  state: State = {
    myTodos: todos.map(todo => ({
      ...todo,
      user: users.find(person => person.id === todo.userId) || null,
    })),
    myUsers: users.map(user => ({
      ...user,
    })),
    title: '',
    userId: '',
    titleError: false,
    userError: false,
  };

  change = (event: Event) => {
    const { name, value } = event.target;

    this.setState((prev: State) => ({
      ...prev,
      titleError: false,
      userError: false,
      [name]: value,
    }));
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { title, userId } = this.state;

    if (title === '') {
      this.setState({ titleError: true });
    }

    if (userId === '') {
      this.setState({ userError: true });
    }
  };

  updateTodos = () => {
    this.setState((prev: State): State | undefined => {
      if (prev.title === '' || prev.userId === '') {
        return;
      }

      prev.myTodos.push({
        userId: +prev.userId,
        id: prev.myTodos.length + 1,
        title: prev.title,
        completed: false,
        user: prev.myUsers.find(person => person.id === +prev.userId) || null,
      });

      // eslint-disable-next-line
      return {
        ...prev,
        title: '',
        userId: '',
      };
    });
  };

  render() {
    const { titleError, userError } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.change}
            />
            {titleError && <span>Please enter the title</span>}
          </div>
          <div>
            <select
              name="userId"
              value={this.state.userId}
              onChange={this.change}
            >
              <option value="">Choose a user</option>
              {this.state.myUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                  {user.username}
                  {' '}
                  {user.email}
                </option>
              ))}
            </select>
            {userError && <span>Please choose a user</span>}
          </div>
          <button
            type="submit"
            onClick={this.updateTodos}
          >
            Add
          </button>
          <TodoList todos={this.state.myTodos} />
        </form>
      </div>
    );
  }
}

export default App;
