import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewToDo.css';

class NewToDo extends Component {
  state = {
    title: '',
    userId: 0,
    validateTitle: true,
    validateUser: true,
  }

  handleChangedInput = ({ target }) => {
    this.setState({
      title: target.value.replace(/[^\w\s]/, ''),
      validateTitle: true,
    });
  }

  handleChangeSelect = ({ target }) => {
    this.setState({
      userId: Number(target.value),
      validateUser: true,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { userId, title } = this.state;

    if (userId && title) {
      this.props.addNewTodo(userId, title);
      this.setState({
        title: '',
        userId: 0,
      });
    } else {
      (!title || !userId) && this.setState({
        validateTitle: !!title,
        validateUser: !!userId,
      });
      // !userId && this.setState({
      //   validateUser: false,
      // });
    }
  };

  render() {
    const { users } = this.props;
    const { validateTitle, validateUser } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="main-form">
        <label htmlFor="task">
          {`New task: `}
          <input
            type="text"
            placeholder="Add new task.."
            onChange={this.handleChangedInput}
            value={this.state.title}
            id="task"
          />
        </label>
        { !validateTitle
          ? <span className="alert">Please enter the title</span>
          : null
        }
        <br />
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor="user-select">
          {`For user: `}
          <select
            value={this.state.userId}
            onChange={this.handleChangeSelect}
            id="user-select"
          >
            <option value={0} disabled>Choose a user ...</option>
            {users
              .map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))
            }
          </select>
        </label>
        { !validateUser
          ? <span className="alert">Please choose a user</span>
          : ''}
        <br />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleSubmit}
        >
          Add task
        </button>
      </form>
    );
  }
}

const usershape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
});

NewToDo.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(usershape).isRequired,
};

export default NewToDo;
