import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NewTodo.scss';

export default class NewTodo extends React.Component {
  state = {
    title: '',
    userId: 0,
    textError: false,
    selectError: false,
  }

  typingTask = (e) => {
    this.setState({
      title: e.target.value.replace(/\W/g, ''),
      textError: false,
    });
  }

  handleChange =(e) => {
    const userId = +e.target.value;

    this.setState(state => ({
      userId,
      selectError: false,
    }));
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    if (!this.state.title) {
      this.setState({
        textError: true,
      });

      return;
    }

    if (!this.state.userId) {
      this.setState({
        selectError: true,
      });

      return;
    }

    this.props.addNewTask({
      title: this.state.title,
      userId: this.state.userId,
      completed: false,
    });
    this.setState({
      title: '',
      userId: 0,
    });
  }

  render() {
    const { users } = this.props;
    const { textError, selectError } = this.state;

    return (
      <div className="navbar bg-primary form-inline">
        <form onSubmit={this.onSubmitForm} className="task-form">
          <div className="text-item">
            <input
              onChange={this.typingTask}
              value={this.state.title}
              maxLength={50}
              className={classNames('form-control ',
                { 'is-invalid ': textError })}
              placeholder="Add new task"
            />
            {textError
              ? (<div className="invalid">Please enter the value</div>)
              : ('')}
          </div>
          <div className="select-item">
            <select
              value={this.state.userId}
              onChange={this.handleChange}
              className="form-control btn btn-secondary"
            >
              <option disabled hidden value={0}>Select User</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
            {selectError
              ? (<div className="invalid">Please choose the user</div>)
              : ('')}

          </div>

          <button type="button" className="btn btn-success">
            Add new task
          </button>
        </form>
      </div>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf.isRequired,
  addNewTask: PropTypes.func.isRequired,
};
