import React from 'react';
import './App.css';
// import classNames from 'classnames';
import users from './api/users';
import todos from './api/todos';
import { TodosList } from './TodosList';

const preparedTodos = todos.map((todo) => {
  const todoCopy = { ...todo };

  todoCopy.user = users.find(person => person.id === todo.userId);

  return todoCopy;
});

class App extends React.Component {
  state = {
    userId: 0,
    todos: preparedTodos,
    textInput: '',
    textError: false,
    selectError: false,
  };

  handleChangeSelect = (event) => {
    this.setState({
      userId: +event.target.value,
      selectError: false,
    });
  }

  handleChangeInput = (event) => {
    this.setState({
      textInput: event.target.value,
      textError: false,
    });
  }

  addTodo = (title, userId) => {
    const todo = {
      id: this.state.todos.length + 1,
      userId,
      title,
      user: users.find(person => person.id === userId),
      completed: false,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  changeOnDefaultState = () => {
    this.setState({
      textInput: '',
      userId: 0,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    const { userId, textInput } = this.state;

    this.setState({
      textError: !textInput,
      selectError: !userId,
    });

    if (!textInput) {
      return;
    }

    if (!userId) {
      return;
    }

    this.addTodo(textInput, userId);
    this.changeOnDefaultState();
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <TodosList className="list" todos={this.state.todos} />
        <form
          onSubmit={this.handleSubmit}
          className="form"
        >
          <input
            type="text"
            value={this.state.textInput}
            className="input"
            // required
            placeholder="Please enter the title"
            onChange={this.handleChangeInput}
          />
          <select
            name="userId"
            id="userId"
            className="select"
            value={this.state.userId}
            onChange={this.handleChangeSelect}
            // required
          >
            <option
              value=""
              className="default-option"
            >
              Choose a user
            </option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
        <div className="error">
          {this.state.textError && (
            <span className="input-error">
              Please enter the title
            </span>
          )}
          {this.state.selectError && (
            <span className="select-error">
              Please choose a user
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default App;
