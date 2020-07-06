import React from 'react';
import './App.css';
import todosFromServer from './api/todos';
import { users } from './api/users';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';

export class App extends React.Component {
  state = {
    todos: todosFromServer,
    todoTitle: '',
    userName: 'Select a user',
    titleError: false,
    userError: false,
  }

  handleTitleChange = (event) => {
    this.setState({
      todoTitle: event.target.value.replace(/[^\s\w]/g, ''),
      titleError: false,
    });
  }

  handleUserChange = (event) => {
    this.setState({
      userName: event.target.value,
      userError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.userName === 'Select a user') {
      this.setState({
        userError: true,
      });
    } else if (this.state.todoTitle === '') {
      this.setState({
        titleError: true,
      });
    } else {
      const selectedUser = users
        .find(user => user.name === this.state.userName);

      this.setState(prevState => ({
        todos: [...prevState.todos, {
          userId: selectedUser.id,
          id: prevState.todos[prevState.todos.length - 1].id + 1,
          title: prevState.todoTitle,
          completed: false,
        }],
        todoTitle: '',
      }));
    }
  }

  render() {
    return (
      <div className="App">
        <NewTodo
          onTitleChange={this.handleTitleChange}
          onUserChange={this.handleUserChange}
          onSubmit={this.handleSubmit}
          user={this.state.userName}
          title={this.state.todoTitle}
          userError={this.state.userError}
          titleError={this.state.titleError}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
