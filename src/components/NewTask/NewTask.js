import React from 'react';
import PropTypes from 'prop-types';
import './NewTask.css';

class NewTask extends React.Component {
  state = {
    newTaskText: '',
    userOption: '',
    errors: {
      title: false,
      username: false,
    },
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  checkEditing = (event) => {
    let titleField;
    let userField;

    switch (event) {
      case 'newTaskText':
        titleField = false;
        break;
      default:
        userField = false;
    }

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

    const { newTaskText, userOption } = this.state;
    const { users, addNewTask, listOfTodos } = this.props;

    if (newTaskText.length < 1 || userOption.length < 1) {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          title: prevState.newTaskText.length < 1,
          username: prevState.userOption.length < 1,
        },
      }));

      return;
    }

    const newTask = {
      title: newTaskText,
      user: users.find(user => user.username === userOption),
      id: listOfTodos.length + 1,
    };

    this.setState({
      newTaskText: '',
      userOption: '',
      errors: {
        title: false,
        username: false,
      },
    });

    addNewTask(newTask);
  };

  render() {
    const {
      newTaskText,
      userOption,
      errors: { title, username },
    } = this.state;

    return (
      <form onSubmit={this.getNewTask} className="App__form">
        <input
          type="text"
          id="title"
          placeholder="Enter a task"
          name="newTaskText"
          value={newTaskText}
          onChange={this.handleChange}
          onFocus={() => this.checkEditing('newTaskText')}
        />

        <span className={title ? 'error' : 'hide-error'}>
          Please enter a new task
        </span>

        <select
          onChange={this.handleChange}
          onFocus={() => this.checkEditing('userOption')}
          value={userOption}
          name="userOption"
        >
          <option>Choose a user</option>

          {this.props.users.map(user => (
            <option
              value={user.username}
              name="userOption"
              key={user.username}
            >
              {user.username}
            </option>
          ))}
        </select>

        <span className={username ? 'error' : 'hide-error'}>
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

NewTask.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  listOfTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  addNewTask: PropTypes.func.isRequired,
};

export default NewTask;
