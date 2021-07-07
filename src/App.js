import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import TodoList from './Components/TodoList/TodoList';
import NewTodo from './Components/NewTodo/NewTodo';

const preparedToDos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    preparedToDos: [...preparedToDos],
    usersList: [...users],
  };

  updateTodosList = (task, userName, taskStatus) => {
    this.setState(state => ({
      preparedToDos: [
        ...state.preparedToDos,
        {
          completed: taskStatus,
          id: state.preparedToDos.length + 1,
          title: task,
          userId: users.find(user => userName === user.name).id,
          user: {
            ...users.find(user => userName === user.name),
          },
        },
      ],
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
        <main className="main">
          <NewTodo
            usersList={this.state.usersList}
            updateTodosList={this.updateTodosList}
          />
          <TodoList preparedToDos={this.state.preparedToDos} />
        </main>
      </div>
    );
  }
}

export default App;
