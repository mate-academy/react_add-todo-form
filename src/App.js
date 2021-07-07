import React from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { AddUser } from './components/AddTodo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    data: preparedTodos,
  }

  addTodo = ({ userId, title }) => {
    this.setState(state => ({
      data: [
        ...state.data,
        {
          userId,
          title,
          id: state.data.length + 1,
          completed: false,
          user: usersFromServer[userId - 1],
        },
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <AddUser
          addedUser={this.addTodo}
          userData={usersFromServer}
        />
        <TodoList todos={this.state.data} />
      </div>
    );
  }
}

export default App;
