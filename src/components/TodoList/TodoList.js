import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Todo from '../Todo/Todo';
import NewTodo from '../NewTodo/NewTodo';
import './TodoList.css';

class TodoList extends React.Component {
  state = {
    userId: 0,
    tempTask: '',
    newTasks: [],
    id: this.props.todosLength,
    selectErrorClassName: false,
    placeholder: '',
  }

  selectName = (event) => {
    this.setState({
      userId: event.target.value,
      selectErrorClassName: false,
    });
  }

  handleTaskChange = (event) => {
    const pattern = /[a-z\s]/g;
    const matches = event.target.value.match(pattern);

    this.setState({
      tempTask: matches ? matches.join('') : '',
      placeholder: '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { tempTask, id, newTasks, userId } = this.state;

    this.setState({
      id: id + 1,
      tempTask: '',
      userId: 0,
      placeholder: '',
      selectErrorClassName: false,
      newTasks: [...newTasks, {
        id: id + 1, task: tempTask, userId: +userId,
      }],
    });
  }

  validatedForm = (event) => {
    event.preventDefault();
    const { tempTask, userId } = this.state;

    if (!tempTask) {
      this.setState({
        placeholder: 'Please enter the title',
      });
    }

    if (!userId) {
      this.setState({
        selectErrorClassName: true,
      });
    }
  }

  render() {
    const { users, todos } = this.props;
    const {
      tempTask,
      newTasks,
      userId,
      placeholder,
      selectErrorClassName,
    } = this.state;

    return (
      <>
        <form
          className={classNames({
            form: true, 'form__select-error': selectErrorClassName,
          })}
          onSubmit={
            tempTask && userId ? this.handleSubmit : this.validatedForm
          }
        >
          <input
            className="form__input"
            type="text"
            placeholder={placeholder}
            value={tempTask}
            onChange={this.handleTaskChange}
          />
          <select
            className="form__select"
            onChange={this.selectName}
            onClick={this.clearedError}
            value={userId}
          >
            <option disabled value="0">
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          <button className="form__button" type="submit">
            Add
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Numder</th>
              <th>Task</th>
              <th>User id</th>
            </tr>
          </thead>
          <tbody>
            <Todo todos={todos} />
            <NewTodo newtask={newTasks} />
          </tbody>
        </table>
      </>
    );
  }
}

TodoList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape).isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape).isRequired,
  todosLength: PropTypes.number.isRequired,
};

export default TodoList;
