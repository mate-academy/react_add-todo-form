import React from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { Modal } from '../Modal/Modal';
import './NewTodo.css';

const errors = [
  {
    id: 666,
    value: `Allowed entering spaces and alphanumeric characters.`,
  },
  {
    id: 777,
    value: `Task name is very long. Please, make it shorter.`,
  },
  {
    id: 888,
    value: `Please, select user.`,
  },
  {
    id: 999,
    value: `You forgot to write the task.`,
  },
];

export class NewTodo extends React.Component {
  state = {
    isModalOpen: false,
    errorCode: 0,
    selectedUser: 'users',
    newTask: '',
  };

  handleModalClose = () => {
    this.setState(prevState => ({
      errorCode: '',
      isModalOpen: false,
    }));
  };

  handleInput = (e) => {
    const { value } = e.target;
    const pattern = /[^\d|\s|\w]/g;

    if (pattern.test(value)) {
      this.setState({
        newTask: value,
        errorCode: 666,
        isModalOpen: true,
      });
    } else {
      this.setState(prev => ({
        errorCode: value.length >= 10
          ? 777
          : 0,
        newTask: value,
        isModalOpen: value.length > 10,
      }));
    }
  };

  handleSelect = (e) => {
    const { value } = e.target;

    this.setState(prev => ({
      errorCode: prev.errorCode !== 0 ? 0 : prev.errorCode,
      isModalOpen: false,
      selectedUser: value,
    }));
  };

  createNewItem = () => ({
    userId: this.props.users.find(el => el.name === this.state.selectedUser).id,
    id: v4().slice(0, 4),
    title: this.state.newTask,
    completed: false,
    user: this.props.users.find(user => user.name === this.state.selectedUser),
  })

  reset = () => {
    this.setState(prev => ({
      isModalOpen: false,
      errorCode: 0,
      selectedUser: 'users',
      newTask: '',
    }));
  }

  makeValidation = () => {
    if (this.state.newTask.length < 1) {
      this.setState({
        errorCode: 999,
        isModalOpen: true,
      });
    }

    if (this.state.selectedUser === 'users') {
      this.setState({
        errorCode: 888,
        isModalOpen: true,
      });
    }
  };

  addNewTodo = () => {
    const { isModalOpen, errorCode } = this.state;
    let todo = {};

    this.makeValidation();
    if (!isModalOpen && errorCode === 0) {
      todo = this.createNewItem();
      this.reset();
    } else {
      this.setState({
        isModalOpen: true,
      });
    }

    return todo;
  }

  render() {
    const {
      users,
      submit,
      deleteDone,
    } = this.props;
    const { isModalOpen, errorCode, selectedUser, newTask } = this.state;

    return (
      <>
        {isModalOpen && (
          <Modal onClose={this.handleModalClose}>
            {errors.find(error => error.id === errorCode).value}
          </Modal>
        )}
        <form
          onSubmit={((e, obj) => submit(e, this.addNewTodo()))}
          className="list-group-item list-group-item-action active"
        >
          <div className="d-flex justify-content-between align-items-end">
            <div className="col-md-3">
              <label htmlFor="inputTask">Enter task name</label>
              <input
                id="inputTask"
                type="text"
                placeholder="Write task here"
                onChange={this.handleInput}
                value={newTask}
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="select">Select user</label>
              <select
                id="select"
                value={selectedUser}
                onChange={this.handleSelect}
                className="form-control"
              >
                <option disabled value="users">Users</option>
                {users.map(user => (
                  <option key={user.id} value={user.name}>{user.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <button
                type="submit"
                className="btn btn-secondary"
              >
                Update ToDoList
              </button>
            </div>
            <div className="col-md-3">
              <button
                type="button"
                onClick={deleteDone}
                className="btn btn-secondary"
              >
                Is done Delete
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  submit: PropTypes.func.isRequired,
  deleteDone: PropTypes.func.isRequired,
};
