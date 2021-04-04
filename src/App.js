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
    chooseUser: '',
    titleError: false,
    userError: false,
    title: '',
    userId: 2,
  };

  handleChenge = (event) => {
    const { name, value } = event.target;
    const { title, chooseUser } = this.state;

    if (title === '') {
      this.setState({ titleError: false });
    }

    if (chooseUser === '') {
      this.setState({ userError: false });
    }

    this.setState({ [name]: value });
  }

  addTodos = () => {
    const { chooseUser, title, userId, usersTodos } = this.state;

    if (title && chooseUser) {
      const newUser = {
        userId,
        id: usersTodos.length + 1,
        title,
        completed: false,
        user: users.find(user => user.name === chooseUser),
      };

      this.setState(state => ({
        userId: state.userId + 1,
        usersTodos: [
          ...state.usersTodos,
          newUser,
        ],
      }));
    }

    if (title === '') {
      this.setState({ titleError: true });
    }

    if (chooseUser === '') {
      this.setState({ userError: true });
    }

    this.setState({
      chooseUser: '',
      title: '',
    });
  }

  render() {
    const { chooseUser,
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
          chooseUser={chooseUser}
          handleChenge={this.handleChenge}
          addTodos={this.addTodos}
        />
        <TodoList
          todos={usersTodos}
          chooseUser={chooseUser}
        />
        <p>
          <span>Users: </span>
          {usersTodos.length}
        </p>
      </div>
    );
  }
}

export default App;
