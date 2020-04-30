import React from 'react';
import './App.css';

import TodoList from './TodoList';
import NewTodo from './NewTodo';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
state = {
  todos: [...todos],
  users: [...users],
  title: '',
  tempTitle: '',
  user: '',
  tempUser: '',
}

handleSubmit = (event) => {
  event.preventDefault();
  if (this.state.tempTitle.split('').length === 0) {
    alert('Please enter the title!');
  } else if (this.state.tempUser.split('').length === 0) {
    alert('Please choose a user!');
  } else {
    this.setState(prevState => ({ title: prevState.tempTitle }));
    this.setState(prevState => ({ user: prevState.tempUser }));
    this.setState({ tempUser: '' });
    this.setState({ tempTitle: '' });
    this.setState(prevState => ({
      todos,
      ...todos.push({
        userId: +prevState.user, title: prevState.title,
      }),
    }));
  }
}

handleChange = (value) => {
  this.setState({ tempTitle: value });
}

selectChange = (value) => {
  this.setState({ tempUser: value });
}

render() {
  const { todos, users } = this.state;
  const preparedTodos = todos.map((item, index) => ({
    ...item,
    id: index + 1,
    user: users.find(user => user.id === item.userId),
  }));

  return (
    <div className="app">
      <TodoList preparedTodos={preparedTodos} />
      <NewTodo
        users={users}
        handleChange={this.handleChange}
        selectChange={this.selectChange}
        handleSubmit={this.handleSubmit}
        tempUser={this.state.tempUser}
        tempTitle={this.state.tempTitle}
      />
    </div>
  );
}
}

export default App;
