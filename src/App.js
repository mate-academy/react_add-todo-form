import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';

class App extends Component {
  state = {
    todoList: todos.map(item => ({
      ...item,
      user: users.find(person => person.id === item.userId),
    })),
    userId: 0,
    userTask: '',
    titleError: true,
    personError: true,
  }

  addNewTask = (id) => {
    if (!this.state.userId || !this.state.userTask) {
      if (this.state.userTask) {
        this.setState({ titleError: true });
      } else {
        this.setState({ titleError: false });
      }

      if (this.state.userId) {
        this.setState({ personError: true });
      } else {
        this.setState({ personError: false });
      }

      return;
    }

    this.setState(prevState => ({
      todoList: [
        ...prevState.todoList,
        {
          id,
          title: prevState.userTask,
          completed: false,
          user: users.find(person => person.id === prevState.userId),
        },
      ],
      userId: 0,
      userTask: '',
      titleError: true,
      personError: true,
    }));
  }

  changeTask = (e) => {
    this.setState({
      userTask: e.target.value,
      titleError: !!e.target.value,
    });
  }

  changeUserId = (e) => {
    this.setState({
      userId: +e.target.value,
      personError: !!+e.target.value,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <TodoForm
          usersList={users}
          changeTask={this.changeTask}
          changeUserId={this.changeUserId}
          addNewTask={this.addNewTask}
          value={this.state.userId}
          id={this.state.todoList.length + 1}
          inputValue={this.state.userTask}
          titleError={this.state.titleError}
          personError={this.state.personError}
        />

        <TodoList list={this.state.todoList} />
      </div>
    );
  }
}

export default App;
