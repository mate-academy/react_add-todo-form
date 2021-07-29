import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { NamesList } from './components/NamesList';
import todos from './api/todos';
import users from './api/users';

const copyTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export class App extends React.Component {
  state = {
    todos: copyTodos,
    title: '',
    isTitleValid: true,
    userName: 'default',
    isUserNameValid: true,
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
      isTitleValid: true,
    });
  }

  selectName = (event) => {
    this.setState({
      userName: event.target.value,
      isUserNameValid: true,
    });
  }

  addNewToDo = (event) => {
    event.preventDefault();
    const { title, userName } = this.state;

    if (title === '') {
      this.setState({
        isTitleValid: false,
      });
    }

    if (userName === 'default') {
      this.setState({
        isUserNameValid: false,
      });
    }

    if (title !== '' && userName !== 'default') {
      const foundUser = users.find(user => user.name === this.state.userName);

      this.setState(prevState => ({
        todos: [...prevState.todos, {
          title: prevState.title,
          user: foundUser,
          completed: false,
          userId: foundUser.id,
          id: copyTodos.length + 1,
        }],
      }));

      this.setState({
        title: '',
        userName: 'default',
      });
    }
  }

  render() {
    return (
      <div className="App">
        <TodoList todos={this.state.todos} />
        <h1>Add todo form</h1>
        <form
          className="form"
          onSubmit={this.addNewToDo}
        >
          <input
            type="text"
            id="add-todo"
            className="input"
            placeholder="Type the name of ToDo"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          {!this.state.isTitleValid && 'Please enter the title'}
          <NamesList
            users={users}
            selectedUser={this.state.userName}
            onChange={this.selectName}
          />
          {!this.state.isUserNameValid && 'Please choose a user'}
          <button
            type="submit"
          >
            Add New Todo
          </button>
        </form>
      </div>
    );
  }
}

export default App;
