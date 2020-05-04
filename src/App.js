import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import NewToDo from './NewToDo/NewToDo';
import ToDoList from './ToDoList/ToDoList';

const newToDo = todos.map(todo => (
  {
    ...todo,
    user: users.find(user => user.id === todo.userId).name,
  }
));

class App extends React.Component {
  state= {
    todos: [...newToDo],
  };

  addToDo =(todo) => {
    this.setState(prevState => (
      {
        todos: [...prevState.todos, todo],
      }
    ));
  };

  changeCompleted = (id) => {
    this.setState(state => ({
      todos: state.todos.map(todo => (
        (todo.id === id)
          ? {
            ...todo,
            completed: !todo.completed,
          }
          : todo
      )),
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <NewToDo
          users={users}
          addToDo={this.addToDo}
          toDoId={this.state.todos[this.state.todos.length - 1].id}
        />
        <ToDoList toDos={this.state.todos} callback={this.changeCompleted} />
      </div>
    );
  }
}

export default App;
