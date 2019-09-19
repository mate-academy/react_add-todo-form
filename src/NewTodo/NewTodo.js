import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  static propTypes = {
    todoID: PropTypes.number.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    onAdd: PropTypes.func.isRequired,
  };

  state = {
    todoID: this.props.todoID,
    userID: 0,
    task: '',
    errors: {
      userID: '',
      task: '',
    },
  };

  onUserSelected = ({ target }) => {
    const index = target.selectedIndex;

    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        userID: '',
      },
    }));

    if (target.value) {
      this.setState({ userID: target.userID });
      this.setState({
        user: {
          id: +target.value,
          name: target[index].text,
        },
      });
    } else {
      this.setState({
        userID: 0,
        user: null,
      });
    }
  };

  onTaskChanged = ({ target }) => {
    const todoValue = target.value;

    if (target.value) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          task: '',
        },
      }));
      this.setState({ task: todoValue });
      this.setState({
        todo: {
          title: todoValue,
        },
      });
    } else {
      this.setState({
        task: '',
        todo: null,
      });
    }
  };

  addTask = (event) => {
    event.preventDefault();
    const { user, todo, todoID } = this.state;

    if (!user) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          userID: 'Please choose a user',
        },
      }));
    }

    if (!todo) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          task: 'Please enter the title',
        },
      }));
    }

    if (user && todo) {
      this.setState(prevState => ({ todoID: prevState.todoID + 1 }));
      this.props.onAdd({
        userId: user.id, id: todoID, ...todo, user: { ...user },
      });
      this.setState({
        userID: 0,
        task: '',
        user: null,
        todo: null,
      });
    }
  };

  render() {
    const { userID, task, errors } = this.state;
    const { users } = this.props;

    return (
      <>
        <form>
          <div className="form-row">
            <div className="form-group col-md-3">
              {errors.userID
                ? <span className="error-message">{errors.userID}</span>
                : ''}
              <select
                className="form-control"
                value={userID}
                onChange={this.onUserSelected}
              >
                <option value="">Choose a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-8">
              {errors.task
                ? <span className="error-message">{errors.task}</span>
                : ''}
              <input
                type="text"
                className="form-control"
                name="task"
                placeholder="add task"
                value={task}
                onChange={this.onTaskChanged}
              />
            </div>
            <div className="form-group col-md-1">
              <button
                type="button"
                className="btn btn-info w-100"
                onClick={this.addTask}
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
}
export default NewTodo;
