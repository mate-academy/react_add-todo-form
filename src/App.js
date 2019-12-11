import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList';
import Form from './components/Form';

function getTodosWithUsers() {
  return todos.map(item => ({
    ...item,
    user: users.find(elem => elem.id === item.userId),
  }));
}

const TodosWithUsers = getTodosWithUsers();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: TodosWithUsers,
      users,
      counter: todos.length,
    };

    this.newItemSubmitted = this.newItemSubmitted.bind(this);
  }

  newItemSubmitted(newItem) {
    this.setState(prevState => ({
      counter: prevState.counter + 1,
    }));
    const temp = {
      ...newItem,
      user: this.state.users.find(elem => elem.id === newItem.userId),
      id: this.state.counter,
    };

    this.setState(prevState => ({
      list: [...prevState.list, temp],
    }));
  }

  render() {
    return (
      <div className="Todo">
        <Form onSubmitted={this.newItemSubmitted} users={this.state.users} />
        <TodoList list={this.state.list} />
      </div>
    );
  }
}

export default App;
