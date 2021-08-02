import React from 'react';
import './App.css';
import users from './api/users';
import todosServer from './api/todos';

const todosList = todosServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export class App extends React.Component {
  state = {
    todos: todosList,
    title: '',
    userId: '',
    isTitleCorrect: false,
    isUserChosen: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  addTodoContent = (event) => {
    if (!this.state.title) {
      this.setState({
        isTitleCorrect: true,
      });
    }

    if (!this.state.userId) {
      this.setState({
        isUserChosen: true,
      });
    }

    if (this.state.title && this.state.userId) {
      const newTodos = {
        title: this.state.title,
        id: this.state.todos.length + 1,
        userId: this.state.userId,
      };

      this.setState(state => ({
        todos: [...state.todos, newTodos],
      }));

      this.setState({
        title: '',
        userId: '',
        isTitleCorrect: false,
        isUserChosen: false,
      });
    }
  }

  render() {
    return (
      <>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.addTodoContent();
          }}
        >
          <label>
            Write title for to do list
            <input
              className="input"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            {this.state.isTitleCorrect && (
              <span className="error">
                write correct title
              </span>
            )}
          </label>
          <label className="header">
            Choose user
            <select
              className="input"
              name="userId"
              value={this.state.userId}
              onChange={this.handleChange}
            >
              <option>
                Select user
              </option>
              {users.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
            {this.state.isUserChosen && (
              <span className="error">
                choose a user
              </span>
            )}
          </label>
          <button
            type="submit"
          >
            Add
          </button>
        </form>
        <ul>
          {this.state.todos.map(todo => (
            <li key={todo.id}>
              <p>
                {`Title: ${todo.title}`}
              </p>
              <p>
                {`Todo Id: ${todo.id}`}
              </p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
export default App;
