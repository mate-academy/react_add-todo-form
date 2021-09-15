import React from 'react';
import './App.css';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(person => person.id === todo.userId) || null;

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
    } as unknown as Pick<State, keyof State>);

    if (name === 'query') {
      this.setState({
        titleAdded: true,
      } as Pick<State, keyof State>);
    } else {
      this.setState({
        userSelected: true,
      } as Pick<State, keyof State>);
    }
  };

  addNewTodo = (todo: Todo) => {
    this.state.todos.push(todo);
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let newTodoList = [];

    const {
      users: selectedUser,
      query,
    } = this.state;

    if (!query.trim().length) {
      this.setState({
        titleAdded: false,
      });

      return;
    }

    if (selectedUser === '') {
      this.setState({
        userSelected: false,
      });

      return;
    // eslint-disable-next-line no-else-return
    } else {
      newTodoList = [...this.state.todos, {
        user: usersFromServer[usersFromServer.findIndex(user => user.name === this.state.users)],
        userId: usersFromServer[usersFromServer.findIndex(user => (
          user.name === this.state.users
        ))].id,
        id: preparedTodos.length,
        title: this.state.query,
        completed: false,
      }];
    }

    this.setState({
      todos: [...newTodoList],
      query: '',
      users: '',
    });
  };

  render() {
    const {
      query,
      titleAdded,
      userSelected,
      users,
      todos,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="section">
            <input
              type="text"
              name="query"
              value={query}
              onChange={this.handleChange}
              placeholder="Add your todo"
              className={classNames('select', !titleAdded && 'error')}
            />
            {!titleAdded && (
              <div className="error_title">*Please enter the title</div>
            )}
          </div>
          <div className="section">
            <select
              name="users"
              value={users}
              onChange={this.handleChange}
              className={classNames('select', !userSelected && 'error')}
            >
              <option value="">Choose a user</option>
              {usersFromServer.map(user => (
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
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
