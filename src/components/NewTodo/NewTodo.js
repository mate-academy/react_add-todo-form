import React from 'react';
import PropTypes from 'prop-types';

import './NewTodo.css';

class NewTodo extends React.PureComponent {
  state = {
    selectUserId: 0,
    inputTitle: '',
    isErrorInput: false,
    isErrorSelect: false,
  }

  handleChangeUser = (event) => {
    const id = Number(event.target.value);

    this.setState({
      selectUserId: id,
      isErrorSelect: false,
    });
  }

  handleChangeTitle = (event) => {
    const title = event.target.value.match(/\w|\s/g);

    if (!Object.is(null, title)) {
      this.setState({
        inputTitle: title.join(''),
        isErrorInput: false,
      });
    } else {
      this.setState({
        inputTitle: '',
        isErrorInput: false,
      });
    }
  }

  handleSubmitForm = (event) => {
    event.preventDefault();

    const {
      inputTitle,
      selectUserId,
    } = this.state;

    if (!inputTitle) {
      this.setState({
        isErrorInput: true,
      });
    }

    if (!selectUserId) {
      this.setState({
        isErrorSelect: true,
      });
    }

    if (inputTitle && selectUserId) {
      const newTodo = {
        userId: selectUserId,
        id: this.props.todosLength + 1,
        title: inputTitle,
        completed: false,
      };

      this.props.addNewTodo(newTodo);

      this.setState({
        selectUserId: 0,
        inputTitle: '',
      });
    }
  }

  render() {
    const {
      isErrorSelect,
      selectUserId,
      isErrorInput,
      inputTitle,
    } = this.state;

    return (
      <form className="App__Form Form" onSubmit={this.handleSubmitForm}>
        <label className="form__label" htmlFor="select">
          {isErrorSelect ? 'Please choose a user' : ''}
        </label>
        <select
          className="form__select"
          id="select"
          value={selectUserId}
          onChange={this.handleChangeUser}
        >
          <option value={0}>Choose a user</option>
          {this.props.users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        <label className="form__label" htmlFor="input">
          {isErrorInput ? 'Please enter the title' : ''}
        </label>
        <input
          className="form__input"
          placeholder="Title"
          id="input"
          value={inputTitle}
          onChange={this.handleChangeTitle}
        />
        <button className="Form__button" type="submit">Add</button>
      </form>
    );
  }
}

export default NewTodo;

const usersShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired,
  phone: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  company: PropTypes.object.isRequired,
}).isRequired;

NewTodo.propTypes = {
  todosLength: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(usersShape).isRequired,
  addNewTodo: PropTypes.func.isRequired,
};
