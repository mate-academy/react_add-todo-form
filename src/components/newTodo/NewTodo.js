import React from 'react';
import PropTypes from 'prop-types';
import './newTodo.css';

class NewTodo extends React.Component {
  state = {
    todoTitle: '',
    selectUser: '',
    errorTitle: '',
    errorUser: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const { errorTitle, errorUser, todoTitle } = this.state;

    if (name === 'todoTitle') {
      if (value.length > todoTitle.length && !(/[\w ]/.test(value.slice(-1)))) {
        return;
      }

      if (errorTitle !== '') {
        this.setState({
          errorTitle: '',
        });
      }
    }

    if (name === 'selectUser' && errorUser !== '') {
      this.setState({
        errorUser: '',
      });
    }

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { todoTitle, selectUser } = this.state;
    const { todos, users, updateAppState } = this.props;

    if (todoTitle === '' || selectUser === '') {
      if (todoTitle === '') {
        this.setState({
          errorTitle: 'Please enter the title',
        });
      }

      if (selectUser === '') {
        this.setState({
          errorUser: 'Please choose a user',
        });
      }

      return;
    }

    const newTodos = [...todos];
    const newTodo = { completed: false };

    const user = users.find(currentUser => (
      currentUser.name === selectUser
    ));

    newTodo.userId = user.id;
    newTodo.id = todos.length + 1;
    newTodo.title = todoTitle;
    newTodo.user = user;
    newTodo.updateAppState = updateAppState;

    newTodos.push(newTodo);

    updateAppState({ todosList: [...newTodos] });

    this.setState({
      todoTitle: '',
      selectUser: '',
    });
  }

  render() {
    const {
      todoTitle, selectUser, errorTitle, errorUser,
    } = this.state;

    const { users } = this.props;

    return (
      <form
        name="addNewTodo"
        className="new-todo-form"
        onSubmit={this.handleSubmit}
        noValidate
      >
        <div>
          <input
            type="text"
            placeholder="Enter new todo"
            name="todoTitle"
            value={todoTitle}
            onChange={this.handleChange}
            required
          />

          <div className="new-todo-form__error">{errorTitle}</div>
        </div>

        <div>
          <select
            name="selectUser"
            className="new-todo-form__select-user"
            value={selectUser}
            onChange={this.handleChange}
            required
          >
            <option value="">---Choose a user---</option>
            {
              users.map(user => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))
            }
          </select>

          <div className="new-todo-form__error">{errorUser}</div>
        </div>

        <button type="submit">
          Add todo
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  updateAppState: PropTypes.func.isRequired,
};

export default NewTodo;
