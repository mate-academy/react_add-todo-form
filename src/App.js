import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import Form from './components/Form/Form';

function usersListTodo(todosArr, usersArr) {
  return todosArr.map(todo => ({
    ...todo,
    user: usersArr.find(user => user.id === todo.userId),
  }));
}

const listOfUsers = usersListTodo(todos, users);

class App extends React.Component {
  state = {
    usersSelected: users,
    selectUser: '',
    taskUser: '',
    error: '',
    name: listOfUsers.map(item => item.user.name),
    task: listOfUsers.map(item => item.title),

  };

  addToDo = (event) => {
    this.setState({
      taskUser: event.target.value,
    });
  };

  addUser = (event) => {
    this.setState({
      selectUser: event.target.value,
    });
  };

  buttonClick = (event) => {
    event.preventDefault();
    if (this.state.selectUser.length > 3 && this.state.taskUser.length > 0) {
      this.setState(prevState => ({
        name: [...prevState.name, prevState.selectUser],
        task: [...prevState.task, prevState.taskUser],
        selectUser: '',
        taskUser: '',
        error: '',
      }));
    } else {
      this.setState({
        error: 'type task and choose person',
      });
    }
  };
  render() {
    return (
      <div className="todo_list">
        <h1>LIST OF TODOS</h1>
        <span>ToDo: </span>
        <Form
          state={this.state}
          listOfUsers={listOfUsers}
          usersSelected={this.state.usersSelected}
          selectUser={this.state.selectUser}
          taskUser={this.state.taskUser}
          error={this.state.error}
          name={this.state.name}
          task={this.state.task}
          buttonClick={this.buttonClick}
          addUser={this.addUser}
          addToDo={this.addToDo}
        />
      </div>
    )
  }
}

export default App;

