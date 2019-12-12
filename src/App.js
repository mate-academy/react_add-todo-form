import './App.css';
import React from 'react';
import PropTypes from 'prop-types';
import users from './api/users';
import todos from './api/todos';

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(person => person.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [...todosWithUsers],
  };

  addNewTodo = (title, userName) => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          title,
          user: { name: userName },
        }],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>List of Todos </h1>
        <div>
          <NewTodo addNewTodo={this.addNewTodo} />
          <TodoList addTodos={this.state.todos} />
        </div>
      </div>
    );
  }
}

class NewTodo extends React.Component {
  state = {
    inputValue: '',
    selectValue: 0,
    inputError: false,
    selectError: false,
  };

  handleInputValue = (element) => {
    this.setState({
      inputValue: element.target.value,
      inputError: false,
    });
  };

  handleSelectValue = (element) => {
    this.setState({
      selectValue: element.target.value,
      selectError: false,
    });
  };

  handleFormSubmit = (element) => {
    element.preventDefault();

    const { inputValue, selectValue } = this.state;

    if (!inputValue || !selectValue) {
      this.setState({
        inputError: !inputValue,
        selectError: !selectValue,
      });

      return;
    }

    this.props.addNewTodo(inputValue, selectValue);

    this.setState({
      inputValue: '',
      selectValue: 0,
    });
  };

  render() {
    const { inputValue, selectValue, inputError, selectError } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={this.handleInputValue}
          placeholder="write title"
        />

        <div className="error">{inputError && 'need title'}</div>
        <div>
          <select
            value={selectValue}
            onChange={this.handleSelectValue}
          >
            <option value="0">
            Choose a user
            </option>
            {users.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          <div className="error">{selectError && 'need User'}</div>
        </div>
        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}

class TodoList extends React.PureComponent {
  render() {
    const { addTodos } = this.props;

    return (
      <div>
        <ul>
          {addTodos.map(text => (
            <li
              key={text.id}
            >
              Title:
              {text.title}
              <p>
              User:
                {text.user.name}
              </p>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  addTodos: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};

NewTodo.propTypes = { addNewTodo: PropTypes.func.isRequired };

export default App;
