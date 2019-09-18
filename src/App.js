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

  handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'title') {
      this.setState({
        title: value,
        errorTitle: null,
      });
    } else if (name === 'username') {
      this.setState({
        selected: value,
        errorUser: null,
      });
    }
  };

  handleClick = (event) => {
    event.preventDefault();
    const { title, username } = event.target;

    if (!username.value && title.value.length === 0) {
      this.setState({
        errorUser: 'You must choose a user',
        errorTitle: 'You must write todo',
      });
    } else if (!username.value) {
      this.setState({
        errorUser: 'You must choose a user',
      });
    } else if (title.value.length === 0) {
      this.setState({
        errorTitle: 'You must write todo',
      });
    } else {
      const newTodo = {
        title: title.value,
        user: users[username.value],
        completed: false,
        id: this.state.todos.length + 1,
        userId: users[username.value].id,
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
            handleClick={this.handleClick}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
