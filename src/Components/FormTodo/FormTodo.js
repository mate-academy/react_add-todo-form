import React from 'react';
import Todo from '../Todo/Todo';

class FormTodo extends React.Component {
  state = {
    selectedUser: '',
    taskTitle: '',
    errorWhithoutUser: '',
    errorWhithoutTasks: '',
  };

  addUser = (event) => {
    this.setState({
      selectedUser: event.target.value,
      errorWhithoutUser: '',
    });
  }

  addToDo = (event) => {
    this.setState({
      taskTitle: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { addUserTask } = this.props;
    const {
      selectedUser,
      taskTitle,
    } = this.state;

    if ((taskTitle.length === 0 || taskTitle[0] === ' ')
      && selectedUser.length === 0) {
      this.setState({
        taskTitle: '',
        errorWhithoutTasks: 'field is required',
        errorWhithoutUser: 'field is required',
      });
    } else if (selectedUser.length === 0 && taskTitle.length > 0) {
      this.setState({
        errorWhithoutTasks: '',
        errorWhithoutUser: 'field is required',
      });
    } else if (taskTitle.length === 0 || taskTitle[0] === ' ') {
      this.setState({
        taskTitle: '',
        errorWhithoutTasks: 'field is required',
      });
    } else if (taskTitle.length > 0
      && selectedUser.length > 0) {
      this.setState({
        selectedUser: '',
        taskTitle: '',
        errorWhithoutTasks: '',
      });
      addUserTask(taskTitle, selectedUser);
    }
  };

  render() {
    const {
      errorWhithoutTasks,
      errorWhithoutUser,
      taskTitle,
      selectedUser,
    } = this.state;
    const {
      usersListShow,
      id,
      tasks,
      names,
    } = this.props;

    return (
      <>
        <span>ToDo: </span>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="task-field"
            onChange={this.addToDo}
            value={taskTitle}
            placeholder={errorWhithoutTasks}
          />
          <p>
            <span>Users:</span>
            <select onChange={this.addUser} value={selectedUser}>
              <option />
              {usersListShow.map(item => <option>{item.name}</option>)}
            </select>
            <p className="error">{errorWhithoutUser}</p>
            <button type="submit">
              Add
            </button>
          </p>
        </form>
        <Todo
          tasks={tasks}
          names={names}
          id={id}
        />
      </>
    );
  }
}

export default FormTodo;
