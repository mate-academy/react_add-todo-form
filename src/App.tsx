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
  hasUserSelectedMessage: boolean,
  titleIsEmpty: boolean,

};

class App extends React.Component<{}, State> {
  state = {
    todosList: [...preparedTodos],
    taskText: '',
    selectedUser: '',
    hasUserSelectedMessage: false,
    titleIsEmpty: false,
  };

  clearForm = () => {
    this.setState({ taskText: '', selectedUser: '' });
  };

  validateForm = () => {
    this.setState(state => ({ hasUserSelectedMessage: state.taskText === '' }));
    this.setState(state => ({ titleIsEmpty: state.taskText === '' }));
  };

  handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskText: event.target.value,
      titleIsEmpty: false,
    });
  };

  handleSelectField = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUser: event.target.value,
      hasUserSelectedMessage: false,
    });
  };

  findUser = () => {
    const { selectedUser } = this.state;

    const currentUser: User | null
      = users.find((user) => user.name === selectedUser) || null;

    if (!currentUser) {
      return null;
    }

    return currentUser || null;
  };

  addTodo = () => {
    const currentUser = this.findUser();

    const createdTodo = {
      userId: currentUser.id,
      id: this.state.todosList.length + 1,
      title: this.state.taskText,
      completed: false,
      user: currentUser,
    };

    this.setState(({ todosList }) => ({ todosList: [...todosList, createdTodo] }));

    this.clearForm();
  };

  render() {
    const {
      todosList, taskText, selectedUser, hasUserSelectedMessage, titleIsEmpty,
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
              onChange={this.handleTitleInput}
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
            <p className={hasUserSelectedMessage ? 'App__warning-text' : 'App__warning-text--none'}>
              Please choose a user!
            </p>
            <p className={hasUserSelectedMessage ? 'App__warning-text--none' : 'App__warning-text--no-warning'}>
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
