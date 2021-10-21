import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

type Todos = {
  userId?: number,
  id: number,
  title: string,
  completed?: boolean,
  name: string | null,
};

interface State {
  todos: Todos[],
  userName: string,
  title: string,
  userError: boolean,
  titleError: boolean,

}

const showingUser: Todos[] = todos.map(todo => ({
  ...todo,
  name: users.find(user => user.id === todo.userId)?.name || null,
}));

class App extends React.Component<{}, State> {
  state: State = {
    todos: showingUser,
    userName: '',
    title: '',
    userError: false,
    titleError: false,
  };

  setTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { userName, title } = this.state;

    if (!userName) {
      this.setState({
        userError: true,
      });
    }

    if (!title) {
      this.setState({
        titleError: true,
      });
    }

    if (userName && title) {
      const newTodo: Todos = {
        name: this.state.userName,
        title: this.state.title,
        id: this.state.todos.length + 1,
      };

      this.setState(state => ({
        todos: [...state.todos, newTodo],
        title: '',
        userName: '',
      }));
    }
  };

  render() {
    const {
      userName,
      title,
      userError,
      titleError,
    } = this.state;

    return (
      <>
        <div className="cover">
          <h1>Add todo form</h1>
          <form onSubmit={this.setTodo}>
            <div className="insideForm">
              <select
                name="user"
                value={userName}
                onChange={event => {
                  this.setState({
                    userName: event.currentTarget.value,
                    userError: false,
                  });
                }}
              >
                <option value="" disabled>Choose a user</option>
                {
                  users.map(user => (
                    <option key={user.id}>
                      {user.name}
                    </option>
                  ))
                }
              </select>
              {userError && (
                <p className="errorPhrase">
                  Please choose a user
                </p>
              )}

              <input
                type="text"
                placeholder="text"
                value={title}
                onChange={(event) => {
                  this.setState({
                    title: event.currentTarget.value,
                    titleError: false,
                  });
                }}
              />
              {titleError && (
                <p className="errorPhrase">
                  Please enter the title
                </p>
              )}

              <button type="submit">
                Add
              </button>
            </div>
            <div className="nameTitleBlock">
              {this.state.todos.map(todo => (
                <div
                  className="nameTitleBlock"
                  key={todo.id}
                >
                  <p>
                    <strong>Name: </strong>
                    {todo.name}
                    {' '}
                  </p>
                  <p>
                    <strong>Title: </strong>
                    {todo.title}
                  </p>
                </div>
              ))}
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default App;
