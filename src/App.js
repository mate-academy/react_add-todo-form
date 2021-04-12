import React from 'react';
import './App.css';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { AddForm } from './components/AddForm';

import users from './api/users';

const preparedTodos = [...todos].map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    usersTodos: preparedTodos,
    selectedUser: '',
    titleError: false,
    userError: false,
    title: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const { title, selectedUser } = this.state;

    if (title === '') {
      this.setState({ titleError: false });
    }

    if (selectedUser === '') {
      this.setState({ userError: false });
    }

    this.setState({ [name]: value.trim() });
  }

  clearForm = () => {
    this.setState({
      selectedUser: '',
      title: '',
      userError: false,
      titleError: false,
    });
  }

addTodo = () => {
  const { selectedUser, title, usersTodos } = this.state;

  if (title && selectedUser) {
    const newUser = {
      id: usersTodos.length + 1,
      title,
      completed: false,
      user: users.find(user => user.name === selectedUser),
    };

    this.setState(state => ({
      usersTodos: [
        ...state.usersTodos,
        newUser,
      ],
    }));
    this.clearForm();
  }

  if (title === '') {
    this.setState({ titleError: true });
  }

  if (selectedUser === '') {
    this.setState({ userError: true });
  }
}

render() {
  const { selectedUser,
    usersTodos,
    title,
    titleError,
    userError }
      = this.state;

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <AddForm
        titleError={titleError}
        title={title}
        userError={userError}
        selectedUser={selectedUser}
        handleChange={this.handleChange}
        addTodo={this.addTodo}
      />
      <TodoList
        todos={usersTodos}
      />
      <p>
        <span>Users: </span>
        {users.length}
      </p>
    </div>
  );
}
}

export default App;
