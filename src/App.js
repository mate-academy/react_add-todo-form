import React from 'react';
import './App.css';
import { TodoList } from './components/Todolist/Todolist';
import { Form } from './components/Form/Form';
import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    hasError: false,
    selectedUserId: '',
    title: '',
    selectedUser: null,
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleSelect = (event) => {
    this.setState({
      selectedUser: users.find(user => user.id === +event.target.value),
      selectedUserId: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, selectedUser } = this.state;

    if (title && selectedUser) {
      const newTodo = {
        user: selectedUser,
        userId: selectedUser.id,
        id: title,
        title,
        completed: false,
      };

      this.setState(state => ({
        todos: [...state.todos, newTodo],
        hasError: false,
        selectedUserId: '',
        title: '',
        selectedUser: null,
      }));
    }

    if (!title) {
      this.setState({
        hasError: true,
      });
    }

    if (!selectedUser) {
      this.setState({
        hasError: true,
      });
    }
  }

  render() {
    const {
      hasError,
      title,
      selectedUserId,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        {hasError
        && (
          <div>
            <h3>error</h3>
            <p>Please enter the title</p>
          </div>
        )
        }
        {hasError
        && (
          <div>
            <h3>error</h3>
            <p>Please choose a user</p>
          </div>
        )
        }
        <Form
          title={title}
          selectedUserId={selectedUserId}
          users={users}
          handleChange={this.handleChange}
          handleSelect={this.handleSelect}
          handleSubmit={this.handleSubmit}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
