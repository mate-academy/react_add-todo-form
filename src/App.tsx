import React from 'react';
import './App.css';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

const preparedTodos: Todo[] = todos.map(todo => {
  const user = users.find(person => person.id === todo.userId) || null;

  return { ...todo, user };
});

interface State {
  todos: Todo[];
  query: string;
  users: string;
  userSelected: boolean;
  titleAdded: boolean;
}

class App extends React.Component<{}, State> {
  state = {
    todos: [...preparedTodos],
    query: '',
    users: '',
    userSelected: true,
    titleAdded: true,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as any);

    if (name === 'query') {
      this.setState({
        titleAdded: true,
      } as any);
    } else {
      this.setState({
        userSelected: true,
      } as any);
    }
  };

  handleSubmit = (event: any) => {
    event.preventDefault();

    const {
      users: u,
      query,
    } = this.state;

    if (!query.trim().length) {
      this.setState({
        titleAdded: false,
      });

      return;
    }

    if (u === '') {
      this.setState({
        userSelected: false,
      });

      return;
    }

    if (u !== '') {
      this.state.todos.push({
        user: users[users.findIndex(user => user.name === this.state.users)],
        userId: users[users.findIndex(user => user.name === this.state.users)].id,
        id: preparedTodos.length,
        title: this.state.query,
        completed: false,
      });
    }

    this.setState(state => ({
      todos: [...state.todos],
      query: '',
      users: '',
    }));
    this.forceUpdate();
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="section">
            <input
              type="text"
              name="query"
              value={this.state.query}
              onChange={this.handleChange}
              placeholder="Add your todo"
              className={classNames('select', !this.state.titleAdded && 'error')}
            />
            {!this.state.titleAdded && (
              <div className="error_title">*Please enter the title</div>
            )}
          </div>
          <div className="section">
            <select
              name="users"
              value={this.state.users}
              onChange={this.handleChange}
              className={classNames('select', !this.state.userSelected && 'error')}
            >
              <option value="">Choose a user</option>
              {users.map(user => (
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {!this.state.userSelected && (
              <div className="error_select">*Please choose a user</div>
            )}
          </div>
          <button type="submit" className="button">Add</button>
        </form>

        <div>
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
