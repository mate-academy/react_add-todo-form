import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

const preparedTodos = todos.map((todo) => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

type State = {
  todosList: Todo[],
  taskText: string,
  selectedUser: string,
  userNotSelectedMessage: boolean,
  titleIsEmpty: boolean,

};

class App extends React.Component<{}, State> {
  state = {
    todosList: [...preparedTodos],
    taskText: '',
    selectedUser: '',
    userNotSelectedMessage: false,
    titleIsEmpty: false,
  };

  clearForm = () => {
    this.setState({ taskText: '', selectedUser: '' });
  };

  validateForm = () => {
    if (this.state.selectedUser !== '') {
      this.setState({ userNotSelectedMessage: false });
    } else {
      this.setState({ userNotSelectedMessage: true });
    }

    if (this.state.taskText !== '') {
      this.setState({ titleIsEmpty: false });
    } else {
      this.setState({ titleIsEmpty: true });
    }
  };

  handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskText: event.target.value,
      titleIsEmpty: false,
    });
  };

  handleSelectField = (event: { target: { value: string; }; }) => {
    const { value } = event.target;

    this.setState({
      selectedUser: value,
      userNotSelectedMessage: false,
    });
  };

  addTodo = () => {
    const { selectedUser } = this.state;

    const currentUser: User | null
      = users.find((user) => user.name === selectedUser) || null;

    if (!currentUser) {
      return;
    }

    this.setState((state) => ({
      todosList: [...state.todosList, {
        userId: 1,
        id: state.todosList.length + 1,
        title: state.taskText,
        completed: false,
        user: currentUser,
      }],
    }));

    this.clearForm();
  };

  render() {
    const {
      todosList, taskText, selectedUser, userNotSelectedMessage, titleIsEmpty,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>
        <form onSubmit={event => event.preventDefault()}>
          <div className="App__taskTitle">
            <input
              type="text"
              size={22}
              value={taskText}
              placeholder="Please enter the title"
              onChange={(event) => this.handleTitleInput(event)}
            />
            <p className={titleIsEmpty ? 'App__warning-text' : 'App__warning-text--none'}>
              Please enter the title!
            </p>
            <p className={titleIsEmpty ? 'App__warning-text--none' : 'App__warning-text--no-warning'}>
              No Warnings Right Now!
            </p>
          </div>
          <div className="App__select">
            <select
              value={selectedUser}
              onChange={this.handleSelectField}
            >
              <option value="" disabled={selectedUser !== ''}>Choose a user</option>
              {users.map((user) => {
                return (
                  <option
                    key={user.id}
                    value={user.name}
                  >
                    {user.name}
                  </option>
                );
              })}

            </select>
            <p className={userNotSelectedMessage ? 'App__warning-text' : 'App__warning-text--none'}>
              Please choose a user!
            </p>
            <p className={userNotSelectedMessage ? 'App__warning-text--none' : 'App__warning-text--no-warning'}>
              No Warnings Right Now!
            </p>
          </div>
          <button className="App__add-button" type="submit" onClick={selectedUser && taskText ? this.addTodo : this.validateForm}>
            Add
          </button>
          <TodoList todos={todosList} />
        </form>
      </div>
    );
  }
}

export default App;
