import React from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const prepearedTodos = todosFromServer.map(todo => {
  const user = usersFromServer.find((person) => person.id === todo.userId) || null;

  return { ...todo, user };
});

type State = {
  title: string,
  userId: number,
  todos: Todo[],
  setFormSubmitted: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    title: '',
    userId: 0,
    todos: [...prepearedTodos],
    setFormSubmitted: false,
  };

  handleSubmit = (event: any) => {
    event.preventDefault();

    const {
      userId,
      title,
      todos,
    } = this.state;

    if (!title.trim() || !userId) {
      this.setState({
        setFormSubmitted: true,
      });
    }

    if (userId && title.trim() && title.length <= 30) {
      const maxId = Math.max(...todos.map(todo => todo.id));

      const newTodo = {
        userId,
        id: maxId + 1,
        title,
        completed: false,
        user: usersFromServer.find((user) => user.id === userId) || null,
      };

      this.setState((state) => ({
        userId: 0,
        title: '',
        todos: [
          ...state.todos,
          newTodo],
        setFormSubmitted: false,
      }));
    }
  };

  titleChange = (event: any) => {
    this.setState({
      title: event.target.value,
    });
  };

  userChange = (event: any) => {
    this.setState({
      userId: +event.target.value,
    });
  };

  render() {
    const {
      todos,
      title,
      userId,
      setFormSubmitted,
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
          {!title.trim() && setFormSubmitted
            && (
              <p className="error">
                Please enter the title
              </p>
            )}
          {title.length > 30
            && (
              <p className="error">
                Max length is 30  symbols
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
          {!userId && setFormSubmitted
            && (
              <p className="error">
                Please choose a user
              </p>
            )}
          <button className="btn" type="submit">
            Add
          </button>
        </form>
        <main className="main">
          <ul className="todo-list">
            <TodoList todos={todos} />
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
