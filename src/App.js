import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

import users from './api/users';
import todos from './api/todos';

function getTodosWithUsers(todos, users) {
  return todos.map(todo => ({
    ...todo,
    user: users.find(item => item.id === todo.userId),
  }));
}

class App extends React.Component {
  state = {
    todos: getTodosWithUsers(todos, users),
    selected: null,
    title: '',
    errorTitle: null,
    errorUser: null,
  };

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
      errorTitle: null,
    });
  };

  handleChangeSelect = (event) => {
    this.setState({
      selected: event.target.value,
      errorUser: null,
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    if (!event.target.username.value && event.target.title.value.length === 0) {
      this.setState({
        errorUser: 'You must choose a user',
        errorTitle: 'You must write todo',
      });
    } else if (!event.target.username.value) {
      this.setState({
        errorUser: 'You must choose a user',
      });
    } else if (event.target.title.value.length === 0) {
      this.setState({
        errorTitle: 'You must write todo',
      });
    } else {
      const newTodo = {
        title: event.target.title.value,
        user: users[event.target.username.value],
        completed: false,
        id: this.state.todos.length + 1,
        userId: users[event.target.username.value].id,
      };

      this.setState(prevState => ({
        todos: [...prevState.todos, newTodo],
        title: '',
        selected: '',
      }));
    }
  };

  render() {
    const {
      errorTitle,
      errorUser,
      todos,
      selected,
      title,
    } = this.state;
    const {
      handleClick,
      handleChange,
      handleChangeSelect,
    } = this;

    return (
      <div className="main">
        <div className="main-todos">
          <TodoList todos={todos} />
          <NewTodo
            users={users}
            errorTitle={errorTitle}
            errorUser={errorUser}
            currentSelect={selected}
            todoName={title}
            handleClick={handleClick}
            handleChange={handleChange}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
      </div>
    );
  }
}

export default App;
