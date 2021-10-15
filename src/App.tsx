import React from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const prepearedTodos = todosFromServer.map(todo => {
  const users = usersFromServer.find((user) => user.id === todo.userId) || null;

  return { ...todo, users };
});

type State = {
  maxLength: boolean,
  title: string,
  userId: number,
  selectTitle: boolean,
  selectUser: boolean,
  todos: Todo[]
};

class App extends React.Component<{}, State> {
  state: State = {
    maxLength: true,
    title: '',
    userId: 0,
    selectTitle: true,
    selectUser: true,
    todos: [...prepearedTodos],
  };

  handleSubmit = (event: any) => {
    event.preventDefault();

    const {
      userId, title, todos, maxLength,
    } = this.state;

    if (userId !== 0 && title !== '' && maxLength !== false) {
      const maxId = Math.max(...todos.map(todo => todo.id));

      const newTodo = {
        userId,
        id: maxId + 1,
        title,
        completed: false,
        users: usersFromServer.find((user) => user.id === userId) || null,
      };

      this.setState((state) => ({
        userId: 0,
        title: '',
        selectTitle: true,
        selectUser: true,
        todos: [
          ...state.todos,
          newTodo],
      }));
    }

    if (userId === 0) {
      this.setState({
        selectUser: false,
      });
    }

    if (title === '') {
      this.setState({
        selectTitle: false,
      });
    }
  };

  titleChange = (event: any) => {
    if (event.target.value.length > 30) {
      this.setState({
        maxLength: false,
      });
    } else {
      this.setState({
        maxLength: true,
      });
    }

    this.setState({
      selectTitle: true,
      title: event.target.value,
    });
  };

  userChange = (event: any) => {
    this.setState({
      selectUser: true,
      userId: +event.target.value,
    });
  };

  render() {
    const {
      maxLength, todos, title, userId, selectTitle, selectUser,
    } = this.state;

    return (
      <div className="App">
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="write something"
            value={title}
            onChange={this.titleChange}
          />
          {!maxLength
            && (
              <p className="length-error">
                Max length is 50  symbols
              </p>
            )}
          <select
            className="selector"
            name="user-id"
            value={userId}
            onChange={this.userChange}
          >
            <option value="0">
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit">
            Add
          </button>
        </form>
        <main className="main">
          <ul className="todo-list">
            <TodoList todos={todos} />
          </ul>
          {!selectUser
            && (
              <div className="error user-error">
                <strong>Please choose a user</strong>
              </div>
            )}
          {!selectTitle
            && (
              <div className="error title-error">
                <strong>Please enter the title</strong>
              </div>
            )}
        </main>
      </div>
    );
  }
}

export default App;
