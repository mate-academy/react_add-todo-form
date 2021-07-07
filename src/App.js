import React from 'react';
import './App.css';
import './components/TodoList/TodoList.css';

import todosFromServer from './api/todos';
import usersFromSrever from './api/users';
import { TodoList } from './components/TodoList';

class App extends React.PureComponent {
  state = {
    todos: [...todosFromServer],
    users: [...usersFromSrever],
    selectedUser: '',
    toDoText: '',
    personPickReminder: false,
    todoPickReminder: false,
  }

  handleChange = (event => (
    this.setState({
      [event.target.name]: event.target.value,
    })
  ))

  addTodo = ((event) => {
    event.preventDefault();

    if (this.state.selectedUser === '') {
      this.setState({
        personPickReminder: true,
      });

      return;
    }

    if (this.state.toDoText === '') {
      this.setState({
        todoPickReminder: true,
      });

      return;
    }

    const { todos, users, selectedUser, toDoText } = this.state;

    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          userId: users.find(person => person.name === selectedUser).id,
          id: todos[todos.length - 1].id + 1,
          title: toDoText,
          completed: false,
        },
      ],
    }));

    this.setState({
      selectedUser: '',
      toDoText: '',
      personPickReminder: false,
      todoPickReminder: false,
    });
  })

  onToggleToDo = (event, todoId) => {
    this.setState(state => ({
      todos: state.todos.map(todo => (todo.id === todoId
        ? {
          ...todo,
          completed: !todo.completed,
        }
        : todo)),
    }));
  }

  render() {
    const { todos, users, selectedUser } = this.state;

    const preparedTodos = todos.map(todo => ({
      ...todo,
      user: users.find(person => todo.userId === person.id),
    }));

    return (
      <>
        <div className="App">
          <h1>Add todo form</h1>
          <form
            method="post"
            onSubmit={this.addTodo}
            className="addTodoForm"
          >
            <select
              name="selectedUser"
              value={selectedUser}
              onChange={this.handleChange}
              className="addTodoForm__name-selector"
            >
              <option value="">Choose a user</option>
              {users.map(user => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>
            {this.state.personPickReminder === true
            && this.state.selectedUser === ''
              ? (
                <p className="addTodoForm__reminder">
                  Please, choose a user
                </p>
              )
              : ''}
            <textarea
              name="toDoText"
              value={this.state.toDoText}
              onChange={this.handleChange}
              className="addTodoForm__todoField"
              placeholder="What is needed to be done"
            />
            {this.state.todoPickReminder === true
             && this.state.toDoText === ''
              ? (
                <p className="addTodoForm__reminder">
                  Please, enter the title
                </p>
              )
              : ''}
            <button
              type="submit"
              className="addTodoForm__submitBtn"
            >
              Add todo
            </button>
          </form>
        </div>
        <TodoList todos={preparedTodos} onToggleToDo={this.onToggleToDo} />
      </>
    );
  }
}

export default App;
