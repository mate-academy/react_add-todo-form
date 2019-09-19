import React from 'react';
import PropTypes from 'prop-types';
import './NewTask.css';

class NewTask extends React.Component {
  state = {
    titleTask: '',
    userID: '',
    errors: {
      title: false,
      username: false,
    },
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  checkEditing = (event) => {
    let titleField;
    let userField;

    event === 'titleTask' ? titleField = false : userField = false;

    this.setState(prevState => ({
      ...prevState,
      errors: {
        title: titleField,
        username: userField,
      },
    }));
  };

  getNewTask = (event) => {
    event.preventDefault();

    const { titleTask, userID } = this.state;
    const { users, addNewTask, listOfTodos } = this.props;

    if (titleTask.length < 1) {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          title: 'error title',
        },
      }));
    } else if (userID.length < 1) {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          username: 'error username',
        },
      }));
    } else {
      const newTask = {
        title: titleTask,
        user: users.find(user => user.username === userID),
        id: listOfTodos.length + 1,
      };

      this.setState({
        titleTask: '',
        userID: '',
        errors: {
          title: false,
          username: false,
        },
      });

      addNewTask(newTask);
    }
  }

  render() {
    const { titleTask, userID, errors: { title, username } } = this.state;

    return (
      <form onSubmit={this.getNewTask} className="app__form">
        <input
          type="text"
          id="title"
          placeholder="Enter a task"
          name="titleTask"
          value={titleTask}
          onChange={this.handleChange}
          onFocus={() => this.checkEditing('titleTask')}
        />

        <span className={title ? 'error title' : 'hide-error'}>
          Please enter a new task
        </span>

        <select
          onChange={this.handleChange}
          onFocus={() => this.checkEditing('userID')}
          value={userID}
          name="userID"
        >
          <option>Choose a user</option>

          {this.props.users.map(user => (
            <option
              value={user.username}
              name="userID"
              key={user.username}
            >
              {user.username}
            </option>
          ))}
        </select>

        <span className={username ? 'error username' : 'hide-error'}>
          Please choose a user
        </span>

        <button
          type="submit"
        >
          Add new task
        </button>
      </form>
    );
  }
}

const usershape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
});

NewTask.propTypes = {
  users: PropTypes.arrayOf(usershape).isRequired,
  listOfTodos: PropTypes.arrayOf(usershape).isRequired,
  addNewTask: PropTypes.func.isRequired,
};

export default NewTask;
