import React from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { ErrorMessage } from './components/ErrorMessage';
import './App.css';

import users from './api/users';
import initialTodos from './api/todos';

const todos = initialTodos.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

function findUser(id) {
  return users.find(user => user.id === id);
}

class App extends React.Component {
  state = {
    title: '',
    isTitleCorrect: true,
    userId: '',
    isUserIdCorrect: true,
  };

  handleChange = (event) => {
    let { value } = event.target;
    const { name } = event.target;

    if (name === 'title') {
      value = value.replace(/[^A-Za-z0-9 ]/g, '');
    }

    this.setState({
      [name]: value,
      [`is${name[0].toUpperCase() + name.slice(1)}Correct`]: true, // :)
    });
  }

  formSubmitHandler = (event) => {
    event.preventDefault();

    const { title, userId } = this.state;

    let isDataCorrect = true;

    if (title.trim().length === 0) {
      this.setState({ isTitleCorrect: false });
      isDataCorrect = false;
    }

    if (userId.length === 0) {
      this.setState({ isUserIdCorrect: false });
      isDataCorrect = false;
    }

    if (isDataCorrect) {
      todos.push({
        userId: Number(userId),
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        user: findUser(Number(userId)),
      });

      this.clearForm();
    }
  }

  clearForm = () => {
    this.setState({
      title: '',
      userId: '',
    });
  }

  render() {
    const { title, userId, isTitleCorrect, isUserIdCorrect } = this.state;

    return (
      <div className="App">

        <h1 className="header">
          Add todo form
        </h1>

        { !isTitleCorrect && (
          <ErrorMessage
            title="Wrong title"
            message="Please enter the title."
          />
        )}

        { !isUserIdCorrect && (
          <ErrorMessage
            title="Wrong user"
            message="Please choose a user."
          />
        )}

        <TodoForm
          title={title}
          userId={userId}
          users={users}
          handleChange={this.handleChange}
          formSubmitHandler={this.formSubmitHandler}
        />

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
