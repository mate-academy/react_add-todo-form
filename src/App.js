import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { NewTodo } from './NewTodo';
import { ToDoList } from './ToDoList';

class App extends React.Component {
  state = {
    todolist: [...todos],
    currentUserId: 0,
    currentTask: '',
    UserCheck: true,
    TaskCheck: true,
  }

  handleUserChange = (event) => {
    this.setState({
      currentUserId: event.target.value,
      UserCheck: true,
    });
  }

  handleTaskChange = (event) => {
    this.setState({
      currentTask: event.target.value,
      TaskCheck: true,
    });
  }

  addTask = () => {
    const { currentUserId, currentTask } = this.state;

    if (currentTask !== '' && currentUserId !== 0) {
      this.setState(prevState => ({
        todolist: [
          ...prevState.todolist,
          {
            userId: currentUserId,
            id: prevState.todolist.length + 1,
            title: currentTask,
            completed: false,
          },
        ],
      }));
    }

    this.checkValidation();
    this.resetForm();
  }

  checkValidation = () => {
    if (this.state.currentUserId === 0) {
      this.setState({ UserCheck: false });
    }

    if (this.state.currentTask === '') {
      this.setState({ TaskCheck: false });
    }
  }

  resetForm = () => {
    this.setState({
      currentUserId: 0,
      currentTask: '',
    });
  }

  render() {
    const {
      todolist,
      currentUserId,
      currentTask,
      UserCheck,
      TaskCheck,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <div>Form with select</div>
        <NewTodo
          currentTask={currentTask}
          currentUserId={Number(currentUserId)}
          handleUserChange={this.handleUserChange}
          addTask={this.addTask}
          users={users}
          handleTaskChange={this.handleTaskChange}
        />

        {UserCheck || (
          <p className="error">Choose User</p>
        )}

        {TaskCheck || (
          <p className="error">Enter Task</p>
        )}

        <div>todos</div>

        <ToDoList todolist={todolist} />

        {}
      </div>
    );
  }
}

export default App;
