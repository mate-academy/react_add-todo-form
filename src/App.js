import React from 'react';
import './App.css';
import { TodosList } from './components/TodosList/TodosList';
import { UsersList } from './components/UsersList/UsersList';

import usersFromApi from './api/users';
import todosFromApi from './api/todos';

const preparedTodos = todosFromApi.map(todo => ({
  ...todo,
  user: usersFromApi.find(user => user.userId === todo.id),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    selectedUserId: 0,
    title: '',
    errorTitle: '',
    errorSelectUser: '',
  }

  handleSelectUser = (event) => {
    const {
      name, value,
    } = event.target;

    this.setState({
      [name]: +value,
      errorSelectUser: '',
    });
  }

  handleChangeTitle = (event) => {
    const {
      name, value,
    } = event.target;

    this.setState({
      [name]: value,
      errorTitle: '',
    });
  }

  render() {
    const {
      todos,
      title,
      selectedUserId,
      errorSelectUser,
      errorTitle,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {todos.length}
        </p>

        <form onSubmit={((event) => {
          event.preventDefault();

          if (!selectedUserId) {
            this.setState({
              errorSelectUser: 'Please choose a user',
            });
          }

          if (!title) {
            this.setState({
              errorTitle: 'Please choose a user',
            });
          }

          if (selectedUserId && title) {
            this.setState((prevState) => {
              const newGood = {
                userId: prevState.selectedUserId,
                id: todos.length + 1,
                title: prevState.title,
                completed: false,
              };

              return ({
                todos: [...prevState.todos, newGood],
                title: '',
                selectedUserId: 0,
              });
            });
          }
        })}
        >

          <span className="error">{errorTitle}</span>
          <input
            type="text"
            name="title"
            placeholder="add title"
            value={title}
            onChange={this.handleChangeTitle}
          />
          <UsersList
            users={usersFromApi}
            handle={this.handleSelectUser}
            selectedUserId={selectedUserId}
          />
          <span className="error">{errorSelectUser}</span>
          <div><button type="submit">Add</button></div>
        </form>
        <TodosList todos={todos} />
      </div>
    );
  }
}

export default App;
