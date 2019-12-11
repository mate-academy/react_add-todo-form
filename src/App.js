import React from 'react';
import './App.css';
import List from './List';
import users from './api/users';
import todos from './api/todos';
import NewToDo from './NewToDo';

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(
    person => person.id === todo.userId
  ),
}));

class App extends React.Component {
  state = { todoList: [...todosWithUsers] }

  add = (title, personName) => {
    this.setState(state => ({
      todoList: [
        ...state.todoList,
        { title, user: { name: personName } }],
    }));
  };

  render() {
    const { todoList } = this.state;

    return (
      <div className="App">
        <h1 className="h1">List of Todos</h1>
        <NewToDo add={this.add} />
        <List todoList={todoList} />
      </div>

    );
  }
}
export default App;
