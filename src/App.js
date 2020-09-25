import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(
  todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }),
);

class App extends React.Component {
  state = {
    userState: '',
    todoState: '',
    todosState: preparedTodos,
    userError: false,
    todoError: false,
  }

  choseUser = (event) => {
    this.setState({
      userState: event.target.value,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { userState, todoState } = this.state;

    if (!userState) {
      this.setState({ userError: true });
    }

    if (!todoState) {
      this.setState({ todoError: true });
    }

    if (userState && todoState) {
      this.setState(state => ({
        todosState: [
          ...state.todosState,
          {
            id: state.todosState.length + 1,
            title: state.todoState,
            user: users.find(user => state.userState === user.name),
          },
        ],
        userState: '',
        todoState: '',
        userError: false,
        todoError: false,
      }));
    }
  }

  render() {
    const { todosState,
      userState,
      todoState,
      userError,
      todoError } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <Form
          users={users}
          userState={userState}
          todoState={todoState}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          userError={userError}
          todoError={todoError}
        />
        <TodoList todosState={todosState} />
      </div>
    );
  }
}

export default App;
