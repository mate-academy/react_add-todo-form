import React from 'react';
import PropTypes from 'prop-types';

export class AddTodoForm extends React.Component {
  state = {
    isTitleValid: true,
    isUserValid: true,
    userId: 0,
    title: '',
  }

  setFormValidity = () => {
    this.setState(state => ({
      isTitleValid: !!state.title,
      isUserValid: !!state.userId,
    }));
  }

  setTodoValueInState = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: name === 'userId' ? +value : value,
    });
  }

  generateNewTodo = (lastId) => {
    const newTodo = {};

    newTodo.id = lastId + 1;
    newTodo.title = this.state.title;
    newTodo.completed = false;
    newTodo.userId = this.state.userId;
    newTodo.user = this.props.users.find(user => user.id === newTodo.userId);

    return newTodo;
  }

  checkFormValidity = () => {
    if (this.state.isTitleValid
      && this.state.isUserValid
      && this.state.userId
      && this.state.title) {
      return true;
    }

    return false;
  }

  handleChange = (event) => {
    this.setTodoValueInState(event);
    this.setFormValidity();
  }

  resetFormState = () => {
    this.setState({
      isTitleValid: true,
      isUserValid: true,
      userId: 0,
      title: '',
    });
  }

  render() {
    const { addTodo, users, lastId } = this.props;
    const { isTitleValid, isUserValid, userId, title } = this.state;
    const newTodo = this.generateNewTodo(lastId);

    return (
      <form>
        {!isTitleValid && (
          <div className="errorMessage">Add todo description</div>
        )}
        <input
          name="title"
          placeholder="todo description"
          value={title}
          onChange={(event) => {
            this.handleChange(event);
          }}
          maxLength="20"
        />
        <button
          type="button"
          onClick={() => {
            this.setFormValidity();
            if (this.checkFormValidity()) {
              addTodo(newTodo);
              this.resetFormState();
            }
          }}
        >
          Add Todo
        </button>
        <select
          name="userId"
          value={userId}
          onChange={(event) => {
            this.handleChange(event);
          }}
        >
          <option value={title}>Choose user</option>
          {users.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        {!isUserValid && (
          <div className="errorMessage">Please choose a user</div>
        )}
      </form>
    );
  }
}

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  lastId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
