import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodosList } from './components/TodosList/TodosList';
import { Error } from './components/Error/Error';

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

  clearForm = () => {
    this.setState({
      textInput: '',
      userId: 0,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
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
    this.clearForm();
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
            placeholder="Please enter the title"
            onChange={this.handleChangeInput}
          />
          <select
            name="userId"
            id="userId"
            className="select"
            value={this.state.userId}
            onChange={this.handleChangeSelect}
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
        <Error
          textError={this.state.textError}
          selectError={this.state.selectError}
        />
      </div>
    );
  }
}

export default App;
