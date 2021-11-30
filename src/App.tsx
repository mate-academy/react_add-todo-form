import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preperedTodos = todosFromServer.map(todo => {
  const user = usersFromServer.find(person => (
    person.id === todo.userId
  )) || null;

  return {
    ...todo, user,
  };
});

type State = {
  title: string,
  userId: number,
  todos: Todo[],
  setFormSubmitted: boolean,
};

class App extends React.Component<{}, State> {
  state = {
    userId: 0,
    title: '',
    todos: [...preperedTodos],
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
      const maxId = todos.length;

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
    this.setState({ title: event.target.value });
  };

  userChange = (event: any) => {
    this.setState({ userId: +event.target.value });
  };

  render() {
    const {
      todos,
      title,
      userId,
      setFormSubmitted,
    } = this.state;

    return (
      <>
        <div className="App">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={this.titleChange}
            />
            {!title.trim() && setFormSubmitted
            && (
              <p>Please enter the title</p>
            )}
            {title.length > 30
              && (
                <p>Max length is 30</p>
              )}
            <select
              name="user-id"
              value={userId}
              onChange={this.userChange}
            >
              <option value="0">Choose user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            {!userId && setFormSubmitted
              && (
                <p className="error">
                  Please choose a user
                </p>
              )}
            <button
              type="submit"
            >
              Add todo
            </button>
          </form>

          <ul>
            <TodoList todos={todos} />
          </ul>
        </div>
      </>
    );
  }
}

export default App;
