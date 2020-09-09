import React from 'react';
import './App.css';
import { TodosList } from './components/TodoList/TodosList';

import users from './api/users';
import todosFromServer from './api/todos';

const preperedTodos = todosFromServer.map(todo => ({
  ...todo,
  userName: users.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state = {
    todos: preperedTodos,
    title: '',
    userName: '',
    hasTitleError: false,
    hasUserError: false,

  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userName } = this.state;

    if (!title || !userName) {
      this.setState({
        hasTitleError: !title,
        hasUserError: !userName,
      });

      return;
    }

    this.setState((state) => {
      const newTodo = {
        id: state.todos.length + 1,
        title: state.title,
        userName: state.userName,
        userId: users.find(item => item.name === userName).id,
      };

      return {
        todos: [newTodo, ...state.todos],
        title: '',
        userName: '',
        hasTitleError: false,
        hasUserError: false,
      };
    });
  }

  render() {
    const { todos, title, userName, hasTitleError, hasUserError } = this.state;

    return (
      <>
        <div className="App">
          <h1>Add todo form</h1>
          <p>
            <span>Users: </span>
            {users.length}
          </p>
          <form onSubmit={this.handleSubmit} className="addedForm">
            <div>
              <input
                className="addedForm__input-title"
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={(event) => {
                  this.setState({
                    title: event.target.value.trimLeft(),
                    hasTitleError: false,
                  });
                }}
              />
            </div>
            <div>
              {hasTitleError && (
                <span className="error">Please enter a title</span>
              )}
            </div>
            <div className="selectUser">
              <select
                className="addedForm__select-user"
                name="userName"
                value={userName}
                onChange={(event) => {
                  this.setState({
                    userName: event.target.value,
                    hasUserError: false,
                  });
                }}
              >
                <option value="">
                  Choose a user
                </option>
                {users.map(item => (
                  <option key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {hasUserError && (
                <span className="error">Please select a user</span>
              )}
            </div>
            <div>
              <button type="submit" className="addedForm__button">
                Add todo
              </button>
            </div>
          </form>
        </div>
        <TodosList todos={todos} />
      </>
    );
  }
}

export default App;
