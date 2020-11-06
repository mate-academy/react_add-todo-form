import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

const todosPrepared = todos.map(
  todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId).name,
  }),
);

export class App extends React.Component {
  state = {
    todos: todosPrepared,
    title: '',
    user: '',
    titleError: true,
    userError: true,
  };

  addTodos = () => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          userId: users.find(item => item.name === state.user).id,
          id: state.todos.length + 1,
          user: state.user,
          title: state.title,
          components: false,
        },
      ],
      title: '',
      user: '',
    }));
  }

  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState({
      [name]: value.trim(),
      [`${name}Error`]: true,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, user } = this.state;

    if (!title) {
      this.setState({ titleError: false });
    }

    if (!user) {
      this.setState({ userError: false });
    }

    if (!user || !title) {
      return;
    }

    if (title || user) {
      this.addTodos();
    }
  }

  render() {
    // eslint-disable-next-line no-shadow
    const { todos, title, user, titleError, userError } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <h3>{`Users: ${users.length}`}</h3>
        <h3>{`Todos: ${todos.length}`}</h3>
        <TodoForm
          users={users}
          title={title}
          user={user}
          titleError={titleError}
          userError={userError}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <TodoList todos={todos} />
      </div>
    );
  }
}
