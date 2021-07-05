
import React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

const preperedTodos = todosFromServer.map(todo => ({
  ...todo,
  userName: usersFromServer.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state = {
    todos: preperedTodos,
    title: '',
    userName: '',
    hasTitleError: '',
    hasPersonError: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userName } = this.state;

    if (!title || !userName) {
      this.setState({
        hasTitleError: !title,
        hasPersonError: !userName,
      });

      return;
    }

    this.setState((state) => {
      const newTodo = {
        id: state.todos.length + 1,
        completed: false,
        title: state.title,
        userName: state.userName,
      };

      return {
        todos: [newTodo, ...state.todos],
        title: '',
        userName: '',
      };
    });
  }

  render() {
    const {
      todos,
      title,
      userName,
      hasTitleError,
      hasPersonError,
    } = this.state;

    return (
      <>
        <div className="App">
          <h1>Add todo form</h1>

          <p>
            <span>
              {`Todos: ${todos.length}`}
            </span>
          </p>
          <p>
            <span>
              {`Users: ${usersFromServer.length}`}
            </span>
          </p>
        </div>
        <form className="formTodo" onSubmit={this.handleSubmit}>
          <label htmlFor="title" id="title">
            Title
            <div className="formItem">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="title"
                value={title}
                onChange={(event) => {
                  ([...event.target.value]).every(elem => elem === ' ')
                    ? this.setState({
                      title: '',
                      hasTitleError: '',
                    })
                    : this.setState({
                      title: event.target.value,
                      hasTitleError: '',
                    });
                }}
              />
            </div>
            {hasTitleError && <span className="warning"> Enter a title </span>}
          </label>
          <div className="formItem">
            <select
              name="userName"
              id="userName"
              value={userName}
              onChange={(event) => {
                this.setState({
                  userName: event.target.value,
                  hasPersonError: '',
                });
              }}
            >
              <option>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {hasPersonError
              && <span className="warning"> Choose a person </span>}
          </div>
          <button type="submit"> Add to do </button>
        </form>
        <TodoList todos={todos} />
      </>
    );
  }
}

export default App;
