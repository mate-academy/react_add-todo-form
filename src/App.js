import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';

const todosData = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

class App extends React.Component {
  state = {
    preparedTodos: todosData,
    todoTitle: '',
    selectedUser: '',
    todoIndex: todosData.length,
    isTitleNotAdded: false,
    isUserNotChosen: false,
  }

  addTodo = (event) => {
    event.preventDefault();

    switch (true) {
      case this.state.todoTitle === '' && this.state.selectedUser === '':
        this.setState({
          isTitleNotAdded: true,
          isUserNotChosen: true,
        });
        break;

      case this.state.todoTitle === '' && this.state.selectedUser !== '':
        this.setState({
          isTitleNotAdded: true,
        });
        break;

      case this.state.todoTitle !== '' && this.state.selectedUser === '':
        this.setState({
          isUserNotChosen: true,
        });
        break;

      default:
        this.setState((prevState) => {
          const newTodo = {
            userId: prevState.selectedUser.id,
            id: prevState.todoIndex + 1,
            title: prevState.todoTitle,
            completed: false,
            user: users.find(user => user.name === prevState.selectedUser),
          };

          return ({
            preparedTodos: [...prevState.preparedTodos, newTodo],
            todoTitle: '',
            selectedUser: '',
            todoIndex: prevState.todoIndex + 1,
          });
        });
    }
  }

  selectUser = (event) => {
    this.setState({
      selectedUser: event.target.value,
      isUserNotChosen: false,
    });
  }

  addTitle = (event) => {
    this.setState({
      todoTitle: event.target.value,
      isTitleNotAdded: false,
    });
  }

  render() {
    const { preparedTodos,
      todoTitle,
      selectedUser,
      isTitleNotAdded,
      isUserNotChosen } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        {isTitleNotAdded
          && <span className="warning title">Please enter the title!</span>}
        {isUserNotChosen
          && <span className="warning user">Please choose user!</span>}
        <form
          className="form"
          action="/api/todos"
          method="POST"
          onSubmit={this.addTodo}
        >
          <label>
            {`Task: `}
            <input
              type="text"
              name="todo"
              placeholder="Task"
              value={todoTitle}
              onChange={this.addTitle}
            />
          </label>
          <select
            className="form__select"
            name="userSelection"
            value={selectedUser}
            onChange={this.selectUser}
          >
            <option>Choose a user</option>
            {users.map(user => <option key={user.id}>{user.name}</option>)}
          </select>
          <button className="form__button" type="submit">
            Add
          </button>
        </form>
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}

export default App;
