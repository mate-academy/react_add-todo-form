import React from 'react';
import PropTypes from 'prop-types';
import { SelectUser } from '../SelectUser';

export class Form extends React.Component {
  state = {
    selectedUserId: 0,
    title: '',
    isTitleWritten: false,
    isUserWritten: false,
  };

  changeTitleHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      isTitleWritten: false,
    });
  }

  selectUserHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: +value,
      isUserWritten: false,
    });
  }

  addTodoInForm = (e) => {
    e.preventDefault();

    const {
      title,
      selectedUserId,
      isTitleWritten,
      isUserWritten,
    } = this.state;

    if (!title || selectedUserId === 0) {
      this.setState({
        isTitleWritten: !isTitleWritten,
        isUserWritten: isUserWritten !== 0,
      });

      return;
    }

    const newTodo = {
      id: this.props.users.length + 1,
      title,
      completed: false,
      userId: selectedUserId,
      user: this.props.users.find(user => user.id === selectedUserId),
    };

    this.props.addTodo(newTodo);

    this.setState({
      selectedUserId: 0,
      title: '',
    });
  }

  render() {
    const {
      title,
      selectedUserId,
      isTitleWritten,
      isUserWritten,
    } = this.state;

    const {
      users,
    } = this.props;

    return (
      <>
        <form method="GET">
          <label>
            <input
              type="text"
              name="title"
              placeholder="Please enter the title"
              value={title}
              onChange={this.changeTitleHandler}
            />
          </label>
          <SelectUser
            selectUserHandler={this.selectUserHandler}
            selectedUserId={selectedUserId}
            users={users}
          />
          <button
            type="submit"
            onClick={this.addTodoInForm}
          >
            Add
          </button>
        </form>
        {isTitleWritten && (
          <div className="isTitleWritten">Dude, write some title</div>
        )}
        {isUserWritten && (
          <div className="isUserWritten">Mate, u didnt choose user</div>
        )}
      </>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  changeTitleHandler: PropTypes.func.isRequired,
  selectUserHandler: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
};
