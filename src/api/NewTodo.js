import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';

class NewTodo extends React.Component {
  state = {
    todos: [...this.props.todos],
    inputValue: '',
    selectUser: '',
    userError: false,
    titleError: false,
  }

  addUserId = (id) => {
    this.setState({
      selectUser: id,
      userError: false,
    });
  }

  addInputValue = (event) => {
    this.setState({
      inputValue: event.target.value.replace(/[^\s\w]/g, ''),
      titleError: false,
    });
  }

  addTodo = () => {
    if (this.state.selectUser === '' || this.state.inputValue === '') {
      if (this.state.selectUser === '') {
        this.setState({ userError: true });
      }

      if (this.state.inputValue === '') {
        this.setState({ titleError: true });
      }
    } else {
      const newTodo = {
        userId: this.state.selectUser,
        id: this.state.todos.length + 1,
        title: this.state.inputValue,
        completed: false,
      };

      this.setState(state => ({
        todos: [
          ...state.todos,
          newTodo,
        ],
        inputValue: '',
        selectUser: '',
      }));
    }
  }

  render() {
    const { users } = this.props;
    const { inputValue, selectUser, todos, userError, titleError } = this.state;

    return (
      <main>
        <form className="form">
          <span className="select-title">
            User
          </span>
          <select
            value={selectUser}
            onChange={(event) => {
              this.addUserId(+event.target.value);
            }}
          >
            <option>Choose a user</option>
            {users.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
          <span className="error">
            {userError ? 'Please choose a user' : ''}
          </span>
          <label className="form" htmlFor="title">
            <span className="input-title">Todo title</span>
            <input
              id="title"
              maxLength={20}
              className="input"
              type="text"
              onChange={this.addInputValue}
              value={inputValue}
            />
            <span className="error">
              {titleError ? 'Please enter the title' : ''}
            </span>
          </label>

          <button
            type="button"
            onClick={this.addTodo}
          >
            Add
          </button>
        </form>
        <TodoList
          todos={todos}
          users={users}
        />
      </main>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewTodo;
