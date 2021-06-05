import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';

import { UsersList } from './components/UsersList';

const SelectError = () => (
  <span className="error error--select">
    Please choose a user
  </span>
);

const TextAreaError = () => (
  <span className="error error--text-area">

    Please enter the title
  </span>
);

class App extends React.Component {
  state = {
    todos,
    users,
    error: '',
    todoId: todos.length,
    userId: '',
    todoTitle: '',
  }

  componentDidUpdate() {
    const { userId, todoTitle } = this.state;

    if (todoTitle && !userId) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        todoTitle: '',
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { todoId, userId, todoTitle } = this.state;

    if (!todoTitle.trim() || !userId) {
      this.setState(state => ({
        error: !state.userId ? 'userId' : 'todoTitle',
      }));

      return;
    }

    const newTodo = {
      userId,
      id: todoId + 1,
      title: todoTitle,
      completed: Math.random() > 0.5,
    };

    this.setState(state => ({
      userId: '',
      todoTitle: '',
      todoId: state.todoId + 1,
      todos: [...state.todos, newTodo],
    }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      error: '',
      [name]: name === 'userId' ? +value : value,
    });
  }

  render() {
    const {
      users: usersList,
      todos: todosList,
      error,
      todoTitle,
      userId,
    } = this.state;

    return (
      <div className="App">
        <header className="header">
          <h1>Add todo</h1>
        </header>
        <main className="main">
          <span>
            {error === 'userId' && <SelectError />}
            {error === 'todoTitle' && <TextAreaError />}
          </span>
          <form className="form" onSubmit={this.handleSubmit}>
            <span className="wraper">
              <select
                className="select"
                name="userId"
                value={userId}
                onChange={this.handleChange}
              >
                <option>Choose a user</option>
                {
                  usersList.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))
                }
              </select>

              <button type="submit" className="button-add"> Submit </button>
            </span>

            <textarea
              name="todoTitle"
              className="text-field"
              placeholder=" Todo title..."
              value={userId ? todoTitle : ''}
              disabled={!userId}
              onChange={this.handleChange}
            />
          </form>

          <section className="board">
            <UsersList
              users={usersList}
              todos={todosList}
            />
          </section>
        </main>
      </div>

    );
  }
}

export default App;
