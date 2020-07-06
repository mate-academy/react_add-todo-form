import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import { UserShape } from './Shapes';
import { UserSelect } from './UserSelect';

export class NewTodo extends React.Component {
    state = {
      task: '',
      value: '',
    };

  addTodoInput = (event) => {
    this.setState({
      task: event.target.value,
    });
  }

  userChosen = (event) => {
    this.setState({
      userId: this.props.users.find(
        user => user.name === event.target.value,
      ).id,
      value: event.target.value,
    });
  }

  removeWhiteSpaces = event => (
    this.setState({
      task: event.target.value.trim(),
    })
  )

  submitHandler = (event) => {
    event.preventDefault();

    this.props.addTodo(this.state);

    this.setState({
      task: '',
      value: '',
    });
  }

  render() {
    const { task, value } = this.state;
    const { users } = this.props;

    return (
      <>
        <form className="form" onSubmit={this.submitHandler}>

          <UserSelect
            value={value}
            users={users}
            userChosen={this.userChosen}
          />
          <label className="form__label" htmlFor="task">
            Enter your task:
          </label>
          <input
            className="form__input"
            type="text"
            id="task"
            name="task"
            placeholder="Task name"
            value={task}
            onChange={this.addTodoInput}
            onBlur={this.removeWhiteSpaces}
            required
          />
          <button
            type="submit"
            className="form__button"
          >
            Add task
          </button>
        </form>
      </>
    );
  }
}

NewTodo.propTypes = {
  users: arrayOf(UserShape).isRequired,
  addTodo: PropTypes.func.isRequired,
};
