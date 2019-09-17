import React from 'react';
import './App.css';
import NewTodo from './components/NewTodo/NewTodo';
import Header from './components/Header/Header';

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
    title: '',
    user: null,
    titleError: null,
    selectError: null,
  };

  handleInputChange = (event) => {
    this.setState({
      title: event.target.value,
      titleError: null,
    });
  };

  handleSelectChange = (event) => {
    this.setState({
      user: event.target.value,
      selectError: null,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      !event.target.userSelect.value
      && event.target.title.value.length === 0
    ) {
      this.setState({
        selectError: 'You must choose a user',
        titleError: 'You must write todo',
      });
    } else if (!event.target.userSelect.value) {
      this.setState({
        selectError: 'You must choose a user',
      });
    } else if (event.target.title.value.length === 0) {
      this.setState({
        titleError: 'You must write todo',
      });
    } else {
      const obj = {
        title: event.target.title.value,
        completed: false,
        user: users[event.target.userSelect.value],
        id: this.state.todos.length + 1,
        userId: users[event.target.userSelect.value].id,
      };

      this.setState(prevState => ({
        todos: [...prevState.todos, obj],
        title: '',
        user: '',
      }));
    }
  };

  render() {
    const { handleSubmit, handleInputChange, handleSelectChange } = this;
    const {
      todos, title, user, titleError, selectError,
    } = this.state;

    return (
      <>
        <Header users={users} todos={todos} />
        <main className="ui inverted segment">
          <NewTodo
            users={users}
            handleSubmit={handleSubmit}
            title={title}
            user={user}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            titleError={titleError}
            selectError={selectError}
          />
          <table className="ui selectable inverted table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Todos</th>
                <th>Status</th>
              </tr>
            </thead>
            {todos.map(todo => (
              <tr>
                <td>{todo.id}</td>
                <td>{todo.user.name}</td>
                <td>{todo.title}</td>
                <td>
                  <i className="red times circle outline icon" />
                </td>
              </tr>
            ))}
          </table>
        </main>
      </>
    );
  }
}

export default App;
