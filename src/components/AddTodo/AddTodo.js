import React from 'react';
import PropTypes from 'prop-types';
import { prepearedTodosType } from '../UserFolder';

import './AddTodo.css';

export class AddTodo extends React.Component {
  state = {
    title: '',
    user: '',
    titleCheck: true,
    userCheck: true,
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  checkInputs = () => {
    const { title, user } = this.state;
    const { usersList, todosList, addTodo } = this.props;
    const selectedUser = usersList.find(userEl => userEl.name === user);
    const newTodo = {
      title: this.state.title,
      id: todosList.length + 1,
      completed: false,
      user: selectedUser,
    };

    if (title && user) {
      addTodo(newTodo);
      this.clearForm();
    }

    if (!title) {
      this.setState({
        titleCheck: false,
      });
    }

    if (!user) {
      this.setState({
        userCheck: false,
      });
    }
  }

  clearForm = () => {
    this.setState({
      title: '',
      user: '',
      titleCheck: true,
      userCheck: true,
    });
  }

  render() {
    const { title, user, titleCheck, userCheck } = this.state;
    const { usersList } = this.props;

    return (
      <div className="addForm">
        <h1 className="header">React add TODO form</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.checkInputs();
        }}
        >
          <p
            className="inputHeader"
          >
            Title of todo:
          </p>
          {!titleCheck && !title
            && <p className="wrnMessage">Add a title, please</p>}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
          />

          <p
            className="inputHeader"
          >
            User of todo:
          </p>
          {!userCheck && !user
            && <p className="wrnMessage">Select a user, please</p>}
          <select
            name="user"
            value={user}
            onChange={this.handleChange}
          >
            <option value="">
              Choose a user
            </option>
            {usersList.map(userEl => (
              <option key={userEl.id}>{userEl.name}</option>
            ))}
          </select>
          <br />
          <button
            type="submit"
            className="btn"
          >
            To add
          </button>

        </form>
      </div>
    );
  }
}

AddTodo.propTypes = {
  usersList: PropTypes.arrayOf(prepearedTodosType.user).isRequired,
  addTodo: PropTypes.func.isRequired,
  todosList: PropTypes.arrayOf(PropTypes.shape({
    title: prepearedTodosType.title,
    id: prepearedTodosType.id,
    completed: prepearedTodosType.completed,
    user: prepearedTodosType.user,
  })).isRequired,
};
