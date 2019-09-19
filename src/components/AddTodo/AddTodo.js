import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AddTodo.css';

class AddTodo extends Component {
  state = {
    title: {
      value: '',
      showError: false,
    },
    selectedUser: {
      value: 0,
      showError: false,
    },
  }

  handleInputChange = ({ name, value }) => {
    this.setState({
      [name]: {
        value: value.replace(/[^\w\s]|^\s/g, ''),
        showError: false,
      },
    });
  }

  handleSubmit = () => {
    const { props: { addTodo }, state: { title, selectedUser } } = this;

    (title.value && selectedUser.value)
      && addTodo(title.value, selectedUser.value);

    this.setState(({ title, selectedUser }) => (
      (title.value && selectedUser.value)
        ? {
          title: {
            value: '',
            showError: false,
          },
          selectedUser: {
            value: 0,
            showError: false,
          },
        }
        : {
          title: {
            value: title.value,
            showError: !title.value,
          },
          selectedUser: {
            value: selectedUser.value,
            showError: !selectedUser.value,
          },
        }
    ));
  }

  render() {
    const {
      props: {
        arrayOfUsers,
      },
      state: {
        title,
        selectedUser,
      },
    } = this;

    return (
      <form>
        <div className="element-of-form">
          <label htmlFor="title">
            Todo:
            {' '}
            <input
              type="text"
              value={title.value}
              onChange={e => this.handleInputChange(e.target)}
              maxLength={30}
              name="title"
              id="title"
            />
          </label>
          {title.showError && (
            <p className="error">Please enter the title</p>
          )}
        </div>

        <div className="element-of-form">
          <label htmlFor="user">
            User:
            {' '}
            <select
              value={selectedUser.value}
              name="selectedUser"
              onChange={e => this.handleInputChange(e.target)}
              id="user"
            >
              <option value={0}>Choose a user</option>
              {arrayOfUsers.map(user => (
                <option value={`${user.id}`}>{user.name}</option>
              ))}
            </select>
          </label>
          {selectedUser.showError && (
            <p className="error">Please choose a user</p>
          )}
        </div>

        <button
          className="element-of-form"
          type="button"
          onClick={this.handleSubmit}
        >
          Add Todo
        </button>
      </form>
    );
  }
}

AddTodo.propTypes = {
  arrayOfUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
