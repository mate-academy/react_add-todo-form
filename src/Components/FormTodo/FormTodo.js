import React from 'react';
import Todo from '../Todo/Todo';

class FormTodo extends React.Component {
  state = {
    selectUser: '',
    taskUser: '',
    errorWhithOutUser: '',
    errorWhithOutTasks: '',
  };

  addUser = (event) => {
    this.setState({
      selectUser: event.target.value,
    });
  }

  addToDo = (event) => {
    this.setState({
      taskUser: event.target.value,
    });
  }

  buttonClick = (event) => {
    event.preventDefault();
    const { addUserTask } = this.props;

    if (this.state.taskUser.length === 0
      && this.state.selectUser.length < 4) {
      this.setState({
        errorWhithOutTasks: 'required to fill in the field',
        errorWhithOutUser: 'required to fill in the field',
      });
    } else if (this.state.selectUser.length < 4 && this.state.taskUser.length > 0) {
      this.setState({
        errorWhithOutTasks: '',
        errorWhithOutUser: 'required to fill in the field',
      });
    } else if (this.state.taskUser.length === 0) {
      this.setState({
        errorWhithOutTasks: 'required to fill in the field',
        errorWhithOutUser: '',
      });
    } else if (this.state.taskUser.length > 0
      && this.state.selectUser.length > 3) {
      this.setState({
        selectUser: '',
        taskUser: '',
        errorWhithOutUser: '',
        errorWhithOutTasks: '',
      });
      addUserTask(this.state.taskUser, this.state.selectUser);
    }
  };

  render() {
    const {
      errorWhithOutTasks,
      errorWhithOutUser,
      taskUser,
      selectUser,
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
        <form onSubmit={this.buttonClick}>
          <input
            type="text"
            onChange={this.addToDo}
            value={taskUser}
            placeholder={errorWhithOutTasks}
          />
          <p>
            <span>Users:</span>
            <select onChange={this.addUser} value={selectUser}>
              <option>...</option>
              {usersListShow.map(item => <option>{item.name}</option>)}
            </select>
            <p className="error">{errorWhithOutUser}</p>
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
